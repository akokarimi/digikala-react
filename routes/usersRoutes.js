const express = require("express");
const router = express.Router();

const usersController = require("./../controllers/usersController");
const authController = require("./../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/isAuth", authController.isAuth);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", usersController.getMe, usersController.getUser);
router.patch("/updateMe", usersController.updateMe);
router.delete("/deleteMe", usersController.deleteMe);

router.get(
  "/addToCart/:productId",
  usersController.getMe,
  usersController.addToCart
);
router.get(
  "/removeFromCart/:productId",
  usersController.getMe,
  usersController.removeFromCart
);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createUser);

router
  .route("/:id")
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
