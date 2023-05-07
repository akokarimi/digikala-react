const Users = require("./../models/usersModel");
const catchAsync = require("./../utilities/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("./../utilities/AppError");
const { promisify } = require("util");
const crypto = require("crypto");

const signJWT = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signJWT(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await Users.create({
    name: req.body.name,
    family: req.body.family,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("لطفاً ایمیل و پسورد خود را وارد کنید", 400));

  const user = await Users.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("ایمیل یا پسورد اشتباه است", 401));
  }

  const correct = await user.comparePassword(password, user.password);

  if (!correct) {
    return next(new AppError("ایمیل یا پسورد اشتباه است", 401));
  }

  createSendToken(user, 201, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expiresIn: new Date(Date.now() + 10 * 1000),
  });
  res.status(200).json({ status: "success" });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await Users.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("کاربری با این توکن وجود ندارد.", 401));
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "کاربر اخیراً پسورد خورد را تغییر داده است. لطفاً مجدداً وارد شوید",
        401
      )
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.isAuth = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const currentUser = await Users.findById(decoded.id);
      if (!currentUser) {
        return next(new AppError("مجاز نیستید", 404));
      }

      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError("مجاز نیستید", 404));
      }

      createSendToken(currentUser, 201, res);
    } catch (err) {
      return next(new AppError("مجاز نیستید", 404));
    }
  }

  next(new AppError("مجاز نیستید", 404));
};

exports.restrictTo = (role) => {
  return (req, res, next) => {
    if (!(role === req.user.role)) {
      next(new AppError("شما مجاز به انجام این کار نیستید!", 403));
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("کاربری بااین ایمیل وجود ندارد", 404));
  }

  const resetToken = user.passwordResetTokenMaker();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/users/resetPassword/${resetToken}`;

  const message = `پسوردتان را فراموش کرده‌اید؟‌ لطفاً جهت ریست کردن پسورد خود، روی لینک زیر بزنید: ${resetURL}.\nاگر رمز عبورتان را فراموش نکرده‌اید لطفاً این ایمیل را نادیده بگیرید.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "لینک ریست کردن پسورد (فعال تا ۱۰ دقیقه)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("هنگام ارسال ایمیل خطایی رخ داد، لطفاً مجدداً تلاش کنید."),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await Users.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("لینک منقضی شده است", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await Users.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!(await user.comparePassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("پسورد فعلی اشتباه است", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
