const Tour = require("../models/tourModel");

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};
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
  let query = Tour.find(JSON.parse(queryStr));

  // 3. SORTING
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // 4. FIELD LIMITING
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  // 5. PAGINATION
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);
  if (req.query.page) {
    const numTours = await Tour.countDocuments();
    if (skip >= numTours) throw new Error("This page does not exist");
  }

  // EXECUTE QUERY
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
