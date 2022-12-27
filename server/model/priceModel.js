const { default: mongoose } = require("mongoose");

const priceSchema = new mongoose.Schema({
  priceMin: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  priceMax: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  grade: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

const Price = mongoose.model("Price", priceSchema);

module.exports = Price;
