const { default: mongoose } = require("mongoose");

const storageSchema = mongoose.Schema({
  warehouseName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Storage = mongoose.model("Storage", storageSchema);

module.exports = Storage;
