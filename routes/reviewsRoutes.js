const express = require("express");

const reviewsController = require("./../controllers/reviewsController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(reviewsController.getAllReviews)
  .post(reviewsController.setTourUserIds, reviewsController.createReview);

router
  .route("/:productId")
  .post(reviewsController.setTourUserIds, reviewsController.createReview);

router
  .route("/:id")
  .get(reviewsController.getReview)
  .patch(reviewsController.updateReview)
  .delete(reviewsController.deleteReview);

module.exports = router;
