const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },

  productQuantity: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  productType: {
    type: String,
    required: true,
  },
  grade: {
    type: mongoose.Schema.Types.String,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  date: {
    type: Date,
  },
});

const Product = mongoose.model("Product", productSchema);

const validateProduct = (User) => {
  const validationSchema = Joi.object({
    productName: Joi.string().required().label("Product Name"),
    productQuantity: Joi.string().required().label("Quantity"),
    location: Joi.string().required().label("Location"),
    productType: Joi.string().required().label("Product Type"),
    grade: Joi.string().label("Product Grade"),
    seller: Joi.string().required().label("Seller"),
    productDate: Joi.date().required().label("Production Date"),
  });
  return validationSchema.validate(User);
};
exports.Product = Product;
exports.validate = validateProduct;
