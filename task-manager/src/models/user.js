const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, uppercase: true },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw Error("Age should be positive number");
        }
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [7, "Password must be greater than 6 characters"],
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw Error("password should not contain the word: password");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "createdBy",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  // delete userObject.password;
  // delete userObject.tokens;

  const { password, tokens, ...alteredUser } = userObject;

  return alteredUser;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = await jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found..!");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Password Not Matched..!");
  }

  return user;
};

// Hashing Password before save to DB
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Deletes all tasks if its createdBy User is deleted
userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ createdBy: user._id });
  next();
});

// User Model
const User = mongoose.model("User", userSchema);

module.exports = User;
