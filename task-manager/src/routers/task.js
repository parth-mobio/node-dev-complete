const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const bodyKeys = Object.keys(req.body);
  const updatableFields = ["description", "completed"];
  const isValidRequest = bodyKeys.every((bodyKey) =>
    updatableFields.includes(bodyKey)
  );

  if (!isValidRequest) {
    return res.status(404).send("Invalid Request Key or Value...!");
  }

  try {
    const task = await Task.findById(req.params.id);

    bodyKeys.forEach((update) => (task[update] = req.body[update]));

    await task.save();

    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
