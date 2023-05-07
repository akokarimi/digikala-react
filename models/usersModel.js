const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "لطفاً نام خود را وارد کنید."],
      trim: true,
      minlength: [2, "طول نام باید حداقل ۲ کاراکتر باشد."],
      maxlength: [80, "طول نام باید حداکثر ۸۰ کاراکتر باشد"],
    },
    family: {
      type: String,
      required: [true, "لطفاً نام خانوادگی خود را وارد کنید."],
      trim: true,
      minlength: [2, "طول نام خانوادگی باید حداقل ۲ کاراکتر باشد."],
      maxlength: [80, "طول نام خانوادگی باید حداکثر ۸۰ کاراکتر باشد."],
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "نوع کاربر باید یا ادمین یا کاربر باشد.",
      },
      default: "user",
    },
    email: {
      type: String,
      required: [true, "لطفاً ایمیل خود را وارد کنید."],
      lowercase: true,
      validate: [validator.isEmail, "ایمیل نامعتبر است."],
      unique: [true, "این ایمیل از قبل حساب ایجاد کرده است."],
    },
    orders: [
      {
        productName: {
          type: mongoose.Schema.ObjectId,
          ref: "Products",
        },
        productCount: {
          type: Number,
        },
      },
    ],
    password: {
      type: String,
      required: [true, "لطفاً پسوردتان را وارد کنید."],
      minlength: [8, "پسورد باید حداقل ۸ کاراکتر باشد."],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "لطفاً پسوردتان را تأیید کنید."],
      select: false,
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (el) {
          return el === this.password;
        },
        message: "پسوردهای وارد شده یکسان نیستند.",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

usersSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

usersSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

usersSchema.pre(/^find/, function (next) {
  this.populate({
    path: "orders.productName",
    select: "name color price discount imageMain type brandEnglish model slug",
  });
  next();
});

usersSchema.methods.comparePassword = async function (candidatePass, pass) {
  return await bcrypt.compare(candidatePass, pass);
};

usersSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

usersSchema.methods.passwordResetTokenMaker = function () {
  const resetToken = crypto.randomBytes(24).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
