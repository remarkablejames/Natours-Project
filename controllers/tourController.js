const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
  const tours = await Tour.find();
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
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: "success, you successfully created a new tour",
    data: newTour,
  });
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
