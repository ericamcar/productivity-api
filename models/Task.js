const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
    maxlength: 30,
  },
  isPriority: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
