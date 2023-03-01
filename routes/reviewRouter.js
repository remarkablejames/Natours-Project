const express = require("express");
const reviewController = require("../controllers/reviewController");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/authController");
const { restrictTo } = require("../controllers/authController");

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route("/:id")
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
