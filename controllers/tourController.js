const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
  console.log(req.query);
  // 1. FILTERING
  const queryObj = { ...req.query };

  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);
  console.log(queryObj);
  // 2. ADVANCED FILTERING
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  const query = Tour.find(JSON.parse(queryStr));

  const tours = await query;
  res.status(200).json({
    status: "success, you are in the tours route",
    data: tours,
  });
};

exports.getTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  res.status(200).json({
    status: "success, you retrieved a tour",
    data: tour,
  });
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success, you successfully created a new tour",
      data: newTour,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  const newTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success, you successfully updated a tour",
    data: newTour,
  });
};

exports.deleteTour = async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success, you successfully deleted a tour",
  });
};
