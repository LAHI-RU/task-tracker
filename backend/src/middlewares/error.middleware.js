const { fail } = require("../utils/apiResponse");

module.exports = function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    return fail(res, "Invalid ID format", 400);
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return fail(res, "Validation failed", 400, errors);
  }

  // Default
  console.error("[error]", err.message);
  return fail(res, err.message || "Server error", statusCode, err.errors || null);
};
