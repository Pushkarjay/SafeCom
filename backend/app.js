// Main application file
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dbConfig = require("./config/db")

// Import routes
const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")

// Initialize express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to database
mongoose
  .connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: dbConfig.user,
    pass: dbConfig.password,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/users", userRoutes)
app.use("/api/messages", messageRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

