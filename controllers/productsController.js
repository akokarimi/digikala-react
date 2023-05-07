const AppError = require("../utilities/AppError");
const Products = require("./../models/productsModel");
const catchAsync = require("./../utilities/catchAsync");
const factory = require("./handlerFactory");

exports.getAllProducts = factory.getAll(Products);
exports.getOneProduct = factory.getOne(Products, { path: "reviews" });
exports.createProduct = factory.createOne(Products);
exports.updateProduct = factory.updateOne(Products);
exports.deleteProduct = factory.deleteOne(Products);
