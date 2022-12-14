const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  auctionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auctionRooms",
    required: true,
  },
  bids: [
    {
      buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Bid = mongoose.model("Bid", bidSchema);
exports.Bid = Bid;
