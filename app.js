const express = require("express");
const logger = require("morgan");

const errorHandler = require("./controllers/errorController");
const userRoute = require("./routers/userRoute");
const transformerRoute = require("./routers/transformerRoute");
const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/transformers", transformerRoute);
app.all("*", (req, res) => {
  console.log(`Route ${req.originalUrl} is not defined`);
});

app.use(errorHandler);
// app.use((err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";

//   res.status(statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// });

module.exports = app;
