const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let tasks = await Task.find();
    res.status(200).json({ success: true, data: tasks });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { taskName, isPriority } = req.body;
    const task = { taskName, isPriority };
    await Task.create(task);
    res.status(201).json({ success: true });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
