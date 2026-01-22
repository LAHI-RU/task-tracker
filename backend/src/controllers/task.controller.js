const Task = require("../models/Task");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { ok } = require("../utils/apiResponse");

// POST /api/tasks
exports.createTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  const task = await Task.create({
    title: title.trim(),
    description: description ?? "",
    status: status ?? "todo"
  });

  return ok(res, task, "Task created", 201);
});

// GET /api/tasks
exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  return ok(res, tasks, "Tasks fetched");
});

// GET /api/tasks/:id
exports.getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) throw new AppError("Task not found", 404);
  return ok(res, task, "Task fetched");
});

// PATCH /api/tasks/:id
exports.updateTask = asyncHandler(async (req, res) => {
  const updates = {};

  if (req.body.title !== undefined) updates.title = req.body.title.trim();
  if (req.body.description !== undefined) updates.description = req.body.description;
  if (req.body.status !== undefined) updates.status = req.body.status;

  const task = await Task.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true
  });

  if (!task) throw new AppError("Task not found", 404);
  return ok(res, task, "Task updated");
});

// DELETE /api/tasks/:id
exports.deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) throw new AppError("Task not found", 404);
  return ok(res, null, "Task deleted");
});
