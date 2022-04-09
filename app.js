//NATOURS PROJECT
//developed independently by Niyongira James

const express = require("express");
const tourRoutes = require("./routes/tourRoutes");

const app = express();

// HANDLING ROUTES
app.use("/api/v1/tours", tourRoutes);

//creating a server

app.listen(3000, () => {
  console.log("server started");
});
