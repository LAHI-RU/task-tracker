const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      trim: true
    },
    description: {
      type: String,
      default: "",
      trim: true
    },
    status: {
      type: String,
      enum: ["todo", "doing", "done"],
      default: "todo"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
