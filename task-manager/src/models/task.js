const mongoose = require("mongoose");

// Task Model
const Task = mongoose.model("Task", {
  description: { type: String, trim: true, required: true },
  completed: { type: Boolean, default: false },
});
module.exports = Task;
