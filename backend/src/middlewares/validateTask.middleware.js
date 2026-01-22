const AppError = require("../utils/AppError");

const allowedStatus = ["todo", "doing", "done"];

function validateCreateTask(req, res, next) {
  const { title, description, status } = req.body;

  const errors = [];

  if (!title || typeof title !== "string" || title.trim().length < 3) {
    errors.push("Title is required and must be at least 3 characters");
  }

  if (description !== undefined && typeof description !== "string") {
    errors.push("Description must be a string");
  }

  if (status !== undefined && !allowedStatus.includes(status)) {
    errors.push('Status must be one of: "todo", "doing", "done"');
  }

  if (errors.length) return next(new AppError("Invalid input", 400, errors));
  next();
}

function validateUpdateTask(req, res, next) {
  const { title, description, status } = req.body;

  const errors = [];

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length < 3) {
      errors.push("Title must be at least 3 characters");
    }
  }

  if (description !== undefined && typeof description !== "string") {
    errors.push("Description must be a string");
  }

  if (status !== undefined && !allowedStatus.includes(status)) {
    errors.push('Status must be one of: "todo", "doing", "done"');
  }

  if (errors.length) return next(new AppError("Invalid input", 400, errors));
  next();
}

module.exports = { validateCreateTask, validateUpdateTask };
