const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb://admin:password@127.0.0.1:27017/task-manager-api?authSource=admin"
);

// User Model
/* const User = mongoose.model("User", {
  name: { type: String, required: true, trim: true, uppercase: true },
  age: { type: Number, default: 0 },
  email: {
    type: String,
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
}); */

/* const me = new User({
  name: "iBrAheeM",
  age: 56,
  email: "test@ToPi.com",
  password: "test1234",
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log("Error: ", error);
  }); */

// Task Model
/* const Task = mongoose.model("Task", {
  description: { type: String, trim: true, required: true },
  completed: { type: Boolean, default: false },
});

const task = new Task({
  description: "   This is challenge task with Mongoose      ",
});

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
 */
