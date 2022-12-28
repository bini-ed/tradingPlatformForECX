const { default: mongoose } = require("mongoose");

const prductNameSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
});

const ProductName = mongoose.model("ProductName", prductNameSchema);

module.exports = ProductName;
