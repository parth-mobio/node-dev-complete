require("../src/db/mongoose");
const Task = require("../src/models/task");

/* Task.findByIdAndDelete("63d13bd8448bac06eee0dfbc")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  }); */

const deleteTaskAndGetCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndGetCount("63d133e5176564f1b0cbe0ef")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log("e", e);
  });
