const express = require("express");
const path = require("path");

const app = express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

const productRouter = require("./routes/productsRoutes");
const userRouter = require("./routes/usersRoutes");
const reviewRouter = require("./routes/reviewsRoutes");
const errorController = require("./controllers/errorController");
const AppError = require("./utilities/AppError");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "discount",
      "ratingsQuantity",
      "ratingsAverage",
      "diameter",
      "price",
      "brandEnglish",
      "screenType",
    ],
  })
);

app.use("/api", limiter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`آدرس ${req.originalUrl} بر روی این سرور وجود ندارد`, 404));
});

app.use(errorController);

module.exports = app;
