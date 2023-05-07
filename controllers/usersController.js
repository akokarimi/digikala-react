const Users = require("./../models/usersModel");
const AppError = require("./../utilities/AppError");
const catchAsync = require("./../utilities/catchAsync");
const factory = require("./handlerFactory");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await Users.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("از اینجا نمی‌توانید پسور را تغییر دهید.", 400));
  }

  const filteredBody = filterObj(req.body, "name", "family", "email");

  const updatedUser = await Users.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await Users.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead",
  });
};

exports.addToCart = catchAsync(async (req, res, next) => {
  if (req.user.orders.length > 0) {
    for (i = 0; i < req.user.orders.length; i++) {
      if (String(req.user.orders[i].productName._id) === req.params.productId) {
        const data = [...req.user.orders];
        data[i].productCount++;
        const newUser = await Users.findOneAndUpdate(
          req.user.id,
          { orders: data },
          {
            new: true,
            runValidators: true,
          }
        );
        return res.status(200).json({
          status: "success",
          data: newUser,
        });
      }
    }
  }
  const data = req.user.orders;
  data.push({ productName: req.params.productId, productCount: 1 });
  newUser = await Users.findByIdAndUpdate(
    req.user.id,
    { orders: data },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: newUser,
  });
});

exports.removeFromCart = catchAsync(async (req, res, next) => {
  if (req.user.orders.length > 0) {
    for (i = 0; i < req.user.orders.length; i++) {
      if (String(req.user.orders[i].productName._id) === req.params.productId) {
        if (req.user.orders[i].productCount > 1) {
          const data = req.user.orders;
          data[i].productCount--;
          const newUser = await Users.findOneAndUpdate(
            req.user.id,
            { orders: data },
            {
              new: true,
              runValidators: true,
            }
          );
          return res.status(200).json({
            status: "success",
            data: newUser,
          });
        } else if (req.user.orders[i].productCount === 1) {
          const data = req.user.orders;
          const x = data.splice(i, 1);
          const newUser = await Users.findOneAndUpdate(
            req.user.id,
            { orders: data },
            {
              new: true,
              runValidators: true,
            }
          );
          return res.status(200).json({
            status: "success",
            data: newUser,
          });
        }
      }
    }
  }
});

exports.getUser = factory.getOne(Users);
exports.getAllUsers = factory.getAll(Users);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(Users);
exports.deleteUser = factory.deleteOne(Users);
