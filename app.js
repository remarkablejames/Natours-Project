const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const app = express();
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// 3) ROUTES
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");
// 1) GLOBAL MIDDLEWARES
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
