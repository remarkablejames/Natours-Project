const express = require("express");
const morgan = require("morgan");
const app = express();

// 3) ROUTES
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");
// 1) MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
