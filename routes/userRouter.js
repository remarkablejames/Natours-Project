const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.route("/").get(authController.protect, userController.getAllUsers);
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router.route("/forgotpassword").post(authController.forgotPassword);
router.route("/resetpassword/:token").patch(authController.resetPassword);
router
  .route("/updatepassword")
  .patch(authController.protect, authController.updatePassword);

// update user data
router.patch("/updateme", authController.protect, userController.updateMe);

// restrict access to admin
router
  .route("/:id")
  .get(authController.protect, userController.getUser)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    userController.deleteUser
  );

module.exports = router;
