const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const taskRoutes = require("./routes/task.routes");
const errorMiddleware = require("./middlewares/error.middleware");


const healthRoutes = require("./routes/health.routes");

const app = express();

// --- Middleware ---
app.use(express.json()); // parse JSON request bodies

// CORS (allow frontend dev server)
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

// Logging
app.use(morgan("dev"));

// --- Routes ---
app.use("/api/health", healthRoutes);
app.use("/api/tasks", taskRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Error handler (must be LAST)
app.use(errorMiddleware);

module.exports = app;
