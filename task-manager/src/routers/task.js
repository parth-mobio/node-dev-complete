const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    createdBy: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//GET tasks?completed=true
//GET tasks?limit=3
//GET tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  sort;
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    const userTasks = await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.status(200).send(userTasks.tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, createdBy: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const bodyKeys = Object.keys(req.body);
  const updatableFields = ["description", "completed"];
  const isValidRequest = bodyKeys.every((bodyKey) =>
    updatableFields.includes(bodyKey)
  );

  if (!isValidRequest) {
    return res.status(404).send("Invalid Request Key or Value...!");
  }

  try {
    const task = await Task.findOne({
      _id: req.param.id,
      createdBy: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }
    bodyKeys.forEach((update) => (task[update] = req.body[update]));

    await task.save();

    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    res.send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
