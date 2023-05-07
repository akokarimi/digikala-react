const Reviews = require("./../models/reviewsModel");
const factory = require("./handlerFactory");

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Reviews);
exports.getReview = factory.getOne(Reviews);
exports.createReview = factory.createOne(Reviews);
exports.updateReview = factory.updateOne(Reviews);
exports.deleteReview = factory.deleteOne(Reviews);
