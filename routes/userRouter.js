const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);

router.use(authController.protect);
router.get("/me", userController.getMe, userController.getUser);
router.patch("/updatepassword", authController.updatePassword);
router.patch("/updateme", userController.updateMe); // update user data
// delete user
router.delete("/deleteme", userController.deleteMe);

// restrict access to admin

router.use(authController.restrictTo("admin"));

router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

module.exports = router;
