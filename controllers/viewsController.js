const Products = require("./../models/productsModel");
const catchAsync = require("./../utilities/catchAsync");
const APIFeatures = require("./../utilities/apiFeatures");
const AppError = require("./../utilities/AppError");

exports.overview = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.productId) filter = { product: req.params.productId };

  const features = new APIFeatures(Products.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // const doc = await features.query.explain();
  const products = await features.query;

  res.status(200).render("overview", {
    title: "محصولات: ساعت مچی",
    products,
  });
});
exports.product = catchAsync(async (req, res, next) => {
  const product = await Products.findOne({ slug: req.params.slug }).populate(
    "reviews"
  );

  if (!product) {
    return next(new AppError("محصولی با این مشخصات پیدا نشد", 404));
  }

  res.status(200).render("product", {
    title: product.name,
    product,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    title: "لطفاً وارد حساب کاربری خود شوید",
  });
});

exports.getme = catchAsync(async (req, res, next) => {
  res.status(200).render("profile", {
    title: "حساب کاربری شما",
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  res.status(200).render("singup"),
    {
      title: "ثبت‌نام",
    };
});

exports.cart = catchAsync(async (req, res, next) => {
  res.status(200).render("booking"),
    {
      title: "سبد خرید",
    };
});
