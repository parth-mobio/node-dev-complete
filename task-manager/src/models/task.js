const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    description: { type: String, trim: true, required: true },
    completed: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Task Model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
