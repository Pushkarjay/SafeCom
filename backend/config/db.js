// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 27017,
  database: process.env.DB_NAME || "safecom",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "password",
}

module.exports = dbConfig

