const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  process.exit(1);
});
const app = require("./app");
const port = process.env.PORT || 3000;
//CONNECTING TO THE DATABASE

const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});
const server = app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
