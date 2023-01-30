const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
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
