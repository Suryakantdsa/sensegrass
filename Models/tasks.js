const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter a title"],
  },
  description: {
    type: String,
    required: [true, "please enter description"],
  },
  dueDate: {
    type: Date,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isInprogress: {
    type: Boolean,
    default: false,
  },
  isYettoDo: {
    type: Boolean,
    default: true,
  },
});


 module.exports=mongoose.model("tasks",taskSchema)

