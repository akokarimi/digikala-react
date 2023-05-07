const mongoose = require("mongoose");
const slugify = require("slugify");

const productsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "نوع محصول را وارد کنید"],
      unique: [true, "نوع محصول نباید یکسان باشد"],
    },
    name: {
      type: String,
      required: [true, "نام محصول نباید خالی باشد"],
      unique: [true, "این نام محصول وجود دارد"],
      trim: true,
      maxlength: [50, "نام محصول باید حداکثر ۵۰ کاراکتر باشد"],
      minlength: [10, "نام محصول باید حداقل ۱۰ کاراکتر باشد"],
    },
    color: {
      type: [String],
      require: [true, "لطفاً رنگ محصول را وارد کنید"],
    },
    brandFarsi: {
      type: String,
      required: [true, "برند محصول نباید خالی باشد"],
      trim: true,
      maxlength: [30, "نام برند باید حداکثر ۳۰ کاراکتر باشد"],
      minlength: [2, "نام برند باید حداقل ۲ کاراکتر باشد"],
    },
    brandEnglish: {
      type: String,
      required: [true, "برند محصول نباید خالی باشد"],
      trim: true,
      maxlength: [30, "نام برند باید حداکثر ۳۰ کاراکتر باشد"],
      minlength: [2, "نام برند باید حداقل ۲ کاراکتر باشد"],
    },
    model: {
      type: String,
      required: [true, "مدل محصول نباید خالی باشد"],
      trim: true,
      maxlength: [30, "نام برند باید حداکثر ۳۰ کاراکتر باشد"],
      minlength: [1, "نام برند باید حداقل ۱ کاراکتر باشد"],
    },

    slug: String,
    application: {
      type: String,
      required: [true, "نوع کاربری نباید خالی باشد"],
      enum: {
        values: ["سلامتی", "روزمره", "ورزشی", "رسمی"],
        message: "نوع کاربری باید ورزشی، روزمره، رسمی یا سلامتی باشد",
      },
    },
    screenType: {
      type: String,
      required: [true, "نوع صفحهٔ محصول نباید خالی باشد"],
      enum: {
        values: ["دایره", "مربع", "مستطیل"],
        message: "نوع صفحه باید مستطیل، مربع یا دایره باشد",
      },
    },
    diameter: {
      type: Number,
      default: 1,
      min: [1, "قطر محصول باید بیشتر از ۱ میلی‌متر باشد"],
      max: [1000, "قطر محصول نباید بیشتر از ۱۰۰۰ میلی‌متر باشد"],
    },
    ratingsAverage: {
      type: Number,
      default: 2.5,
      min: [1, "امتیاز باید از ۱ بیشتر باشد"],
      max: [5, "امتیاز باید از ۵ کمتر باشد"],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "قیمت محصول نباید خالی باشد"],
    },
    discount: {
      type: Number,
      min: [0, "درصد تخفیف باید یا صفر یا بیشتر از صفر باشد"],
      max: [100, "درصد تخفیف باید از ۱۰۰ کمتر باشد"],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    imageMain: {
      type: String,
      required: [true, "محصول باید یک تصویر اصلی داشته باشد"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
productsSchema.index({ price: 1 });
productsSchema.index({ slug: 1 });

productsSchema.virtual("reviews", {
  ref: "Reviews",
  foreignField: "product",
  localField: "_id",
});

productsSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: false });
  next();
});

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
