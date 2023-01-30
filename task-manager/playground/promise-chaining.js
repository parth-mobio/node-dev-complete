require("../src/db/mongoose");
const User = require("../src/models/user");

/* User.findByIdAndUpdate("63d38492f6e9cc64975b8671", {
  name: "Ibrahim",
  age: 46,
})
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 46 });
  })
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  }); */

const modifyUserAndGetCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

modifyUserAndGetCount("63d389d2a63cef0b0e369819", 46)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log("e", e);
  });
