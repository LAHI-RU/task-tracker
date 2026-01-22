const router = require("express").Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require("../controllers/task.controller");

const {
  validateCreateTask,
  validateUpdateTask
} = require("../middlewares/validateTask.middleware");

router.post("/", validateCreateTask, createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.patch("/:id", validateUpdateTask, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
