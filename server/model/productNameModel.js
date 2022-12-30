const { default: mongoose } = require("mongoose");

const prductNameSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productType: [
    {
      type: String,
      required: true,
    },
  ],
  grade: [
    {
      type: String,
      required: true,
    },
  ],
});

const ProductName = mongoose.model("ProductInfo", prductNameSchema);

module.exports = ProductName;
