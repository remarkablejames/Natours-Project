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
// delete user
router.delete("/deleteme", authController.protect, userController.deleteMe);

// restrict access to admin
router.route("/:id").get(authController.protect, userController.getUser);

module.exports = router;
