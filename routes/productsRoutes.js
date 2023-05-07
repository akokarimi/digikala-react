const express = require("express");

const productsController = require("./../controllers/productsController");
const reviewsRoutes = require("./../routes/reviewsRoutes");
const authController = require("./../controllers/authController");
const router = express.Router();

router.use("/:productId/reviews", reviewsRoutes);

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    productsController.createProduct
  );

router
  .route("/:id")
  .get(productsController.getOneProduct)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    productsController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    productsController.deleteProduct
  );

module.exports = router;
