const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:3000",
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const views = require("./routes/viewRoutes");

app.use("/", views);

app.all("*", (req, res, next) => {
  // If a "next()" function has a parameter, that's always an ERROR!
  // Skips all other middlewars, and go to the ERROR handling middleware!
  next();
});

module.exports = app;
