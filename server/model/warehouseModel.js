const { default: mongoose } = require("mongoose");

const warehouseSchema = mongoose.Schema({
  productQuantity: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  inSale: {
    type: Boolean,
    required: true,
    default: false,
  },
  inWarehouse: {
    type: Boolean,
    required: true,
    default: true,
  },
  paymentDone: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const WareHouse = mongoose.model("warehouse", warehouseSchema);

module.exports = WareHouse;
