const express = require("express");
const cors = require("cors");

const app = express();

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/news", require("./routes/newsRoutes"));
app.use("/fav", require("./routes/favouriteRoutes"));

module.exports = app;