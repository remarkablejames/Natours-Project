const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const port = process.env.PORT || 3000;
//CONNECTING TO THE DATABASE
const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
