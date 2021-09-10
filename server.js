require("dotenv").config();
const express = require("express");

require("./config/database.js");

const taskRoutes = require("./routes/tasks");

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => res.send("API is running..."));

app.use("/tasks", taskRoutes);

app.use((err, req, res, next) => {
  const error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = { statusCode: 404, message };
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = { statusCode: 404, message };
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server error" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
