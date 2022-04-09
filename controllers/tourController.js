exports.getAllTours = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "all tours will be here!",
  });
};
