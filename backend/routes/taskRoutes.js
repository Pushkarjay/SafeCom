// Task routes
const express = require("express")
const router = express.Router()
const taskController = require("../controllers/taskController")
const authMiddleware = require("../middleware/auth")

// Apply authentication middleware to all routes
router.use(authMiddleware)

// Task routes
router.get("/", taskController.getAllTasks)
router.post("/", taskController.createTask)
router.get("/:id", taskController.getTaskById)
router.put("/:id", taskController.updateTask)
router.delete("/:id", taskController.deleteTask)
router.post("/:id/accept", taskController.acceptTask)

module.exports = router

