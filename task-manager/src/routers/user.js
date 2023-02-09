const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
const {
  sendWelcomeEmail,
  sendCancallationEmail,
} = require("../email/accounts");

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    sendWelcomeEmail(user.email, user.name);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//login route
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((key) => {
      return key.token !== req.token;
    });

    await req.user.save();
    res.send("Logout Successful..!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Logout Problem");
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("Logout All Successful..!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Logout All Problem");
  }
});

//get logged in user profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// get any user by its id
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

// update any user by id param
/* router.patch("/users/:id", async (req, res) => {
  const bodyKeys = Object.keys(req.body); // converts request body object into Array ({} -> )
  const updatableFields = ["name", "age", "email", "password"];
  const isValidRequest = bodyKeys.every((bodyKey) =>
    updatableFields.includes(bodyKey)
  );

  if (!isValidRequest) {
    return res.status(404).send("Invalid Request Key or Value...!");
  }

  try {
    const user = await User.findById(req.params.id);

    bodyKeys.forEach((update) => (user[update] = req.body[update]));

    await user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}); */

//updates fields for logged in user
router.patch("/users/me", auth, async (req, res) => {
  const bodyKeys = Object.keys(req.body); // converts request body object into Array ({} -> )
  const updatableFields = ["name", "age", "email", "password"];
  const isValidRequest = bodyKeys.every((bodyKey) =>
    updatableFields.includes(bodyKey)
  );

  if (!isValidRequest) {
    return res.status(404).send("Invalid Request Key or Value...!");
  }

  try {
    bodyKeys.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    /*     if (!user) {
      return res.status(404).send();
    } */
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// delete any user by id param
/* router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}); */

// delete logged in user
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    sendCancallationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Uploads profile pic
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    // if (!file.originalname.endsWith(".pdf")) {
    //   return cb(new Error("Please upload PDF file only"));
    // }

    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload Image (jpg/jpeg/png) file only"));
    }
    cb(undefined, true);
  },
});
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete(
  "/users/me/avatar",
  auth,
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
