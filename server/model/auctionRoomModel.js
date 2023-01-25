const mongoose = require("mongoose");

const auctionRoomSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "warehouse",
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: mongoose.Schema.Types.Date,
    required: true,
    default: Date.now(),
  },
  productQuantity: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  isStarted: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
    default: false,
  },
  isDone: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
    default: false,
  },
  isActive: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
    default: false,
  },
  minPrice: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

const AuctionRoom = mongoose.model("AuctionRoom", auctionRoomSchema);

exports.AuctionRoom = AuctionRoom;
