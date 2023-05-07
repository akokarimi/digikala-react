const mongoose = require("mongoose");
const Products = require("./productsModel");

const reviewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "لطفاً عنوان نظر را وارد کنید"],
    },
    review: {
      type: String,
      required: [true, "لطفاً نظرتان را وارد کنید"],
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
    rating: {
      type: Number,
      required: [true, "لطفاً به محصول امتیاز بدهید"],
      min: [1, "امتیاز نباید از یک کمتر باشد"],
      max: [5, "امتیاز نباید از پنج بیشتر باشد"],
    },
    recommend: {
      type: String,
      enum: {
        values: ["توصیه می‌کنم", "توصیه نمی‌کنم", "نظری ندارم"],
        message: "آیا این محصول را توصیه می‌کنید؟",
      },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: [true, "نظر باید به یک کاربر تعلق داشته باشد."],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Products",
      required: [true, "نظر باید به یک محصول تعلق داشته باشد."],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// reviewsSchema.index({ product: 1, user: 1 }, { unique: true });

reviewsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name family",
  });
  next();
});

reviewsSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Products.findByIdAndUpdate(productId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Products.findByIdAndUpdate(productId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewsSchema.post("save", function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.product);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewsSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewsSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.product);
});

const Reviews = mongoose.model("Reviews", reviewsSchema);

module.exports = Reviews;
