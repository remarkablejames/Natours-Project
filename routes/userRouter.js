const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.get("/", authController.protect, userController.getAllUsers);
router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);
router.patch(
  "/updatepassword",
  authController.protect,
  authController.updatePassword
);

// update user data
router.patch("/updateme", authController.protect, userController.updateMe);
// delete user
router.delete("/deleteme", authController.protect, userController.deleteMe);

// restrict access to admin
router
  .route("/:id")
  .get(authController.protect, userController.getUser)
  .delete(authController.protect, userController.deleteUser);

module.exports = router;
