const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");

const app = express();

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, //
  max: 5,
  message: "too many request from this ip",
});

app.use(morgan("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(apiRequestLimiter);

//my middleware

const isLogin = (req, res, next) => {};

app.get("/products", (req, res) => {
  res.send("products are this is good returned");
});
app.get("/users", (req, res) => {
  res.send("user are this is good returned");
});

//router error handle
app.use((req, res, next) => {
  next(createError(404, "route not found"));
});
//server error handle
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

app.get("/", (req, res) => {
  res.status(200).send({ message: "welcome to server" });
});

module.exports = app;
