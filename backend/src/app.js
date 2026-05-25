const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://news-app-llrm.vercel.app"
    ],

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ],

    credentials: true
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

app.use("/auth", authRoutes);
app.use("/news", newsRoutes);
app.use("/fav", favouriteRoutes);

module.exports = app;