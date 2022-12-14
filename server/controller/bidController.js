const { Bid } = require("../model/bidModel");

const placeBid = async (req, res) => {
  const { amount, auctionId } = req.body;
  var io = req.app.get("socketio");
  const { id } = req.user;

  const findAuction = await Bid.findOne({ auctionId });

  if (!findAuction) {
    const bidSchema = { auctionId, bids: { buyerId: id, amount } };

    let bid = new Bid(bidSchema);
    const saveBid = await bid.save();
    if (!saveBid)
      return res.status(404).send("Operation failed, Please try again");
    return res.send("Role added successfully");
  } else {
    findAuction.bids.push({ id, amount });
    const savedProduct = await findAuction.save();
    res.status(200).json(savedProduct);
  }
};

const getBidsForSpecificAuction = async (req, res) => {
  const { auctionId } = req.params;
  const findAuction = await Bid.findOne({ auctionId })
    .populate({
      path: "bids.buyerId",
      model: "User",
      select: "-__v -password  -email -date",
    })
    .sort("_bids._id");
  if (!findAuction) {
    return res.status(404).send("Operation failed, Please try again");
  } else {
    res.send(findAuction);
  }
};

module.exports = { placeBid, getBidsForSpecificAuction };
