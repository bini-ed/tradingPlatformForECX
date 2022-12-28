const { default: mongoose } = require("mongoose");

const auctionSchema = new mongoose.Schema({
  auctionRoom: [
    {
      auctionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AuctionRoom",
      },
      date: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now(),
      },
    },
  ],
});

const Auction = mongoose.model("Auction", auctionSchema);

exports.Auction = Auction;
