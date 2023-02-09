const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

const port = process.env.PORT;
app.use(express.json());

/* app.use((req, res, next) => {
  res.status(503).send("Service Unavailable. Maintenance Mode...!");
}); */
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up and runing on port ${port}`);
});

// testing bcryptjs
/* const bcryptjs = require("bcryptjs");
const { default: isEmail } = require("validator/lib/isEmail");

const myBrypt = async (pass) => {
  const hashedPassword = await bcryptjs.hash(pass, 8);

  const isMatched = await bcryptjs.compare(pass, hashedPassword);

  console.log(pass);
  console.log(hashedPassword);
  console.log(isMatched);
};

myBrypt("manu"); */

// testing jsonwebtoken
/* const jwt = require("jsonwebtoken");

const myJwtFunction = async () => {
  const token = await jwt.sign({ _id: "abcchikla123" }, "process.env.JWT_SECRET");
  console.log(token);

  const isVerified = await jwt.verify(token, "thisismysecretsign");
  console.log(isVerified);
};
myJwtFunction(); */

// const Task = require("./models/task");
// const User = require("./models/user");

// const funct = async () => {
// const task = await Task.findById("63d8f1b6b9bc71c5fbcf1051");
// await task.populate("createdBy");
// console.log(task.createdBy);
//
// const user = await User.findById("63d8f148b9bc71c5fbcf1041");
// const user = await User.findById("63d8fbc3a15e7468b9b41b07");
// await user.populate("tasks");
// console.log(user.tasks);
// };
// funct();
