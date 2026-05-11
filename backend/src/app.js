const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "https://news-app-llrm.vercel.app"
}));

app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/news", require("./routes/newsRoutes"));
app.use("/fav", require("./routes/favouriteRoutes"));

module.exports = app;