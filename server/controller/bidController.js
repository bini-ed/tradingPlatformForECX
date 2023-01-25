const { Bid } = require("../model/bidModel");

const placeBid = async (req, res) => {
  const { amount, auctionId } = req.body;
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
    .sort("_bids._id")
    .populate({
      path: "auctionId",
      model: "AuctionRoom",
      populate: { path: "product", populate: { path: "product" } },
    });

  if (!findAuction) {
    return res.status(404).send("Operation failed, Please try again");
  } else {
    res.send(findAuction);
  }
};
const getBidsById = async (req, res) => {
  const { bidId } = req.params;
  const findAuction = await Bid.findById(bidId)
    .populate({
      path: "auctionId",
      model: "AuctionRoom",
      populate: { path: "product", populate: { path: "product" } },
    })
    .populate({
      path: "bids.buyerId",
      model: "User",
      select: "-__v -password  -email -date",
    });

  if (!findAuction) {
    return res.status(404).send("Operation failed, Please try again");
  } else {
    res.send(findAuction);
  }
};

const getBidsForSpecificUserAuction = async (req, res) => {
  const { auctionId, buyerId } = req.params;
  const findLastBid = await Bid.find(
    { auctionId },
    { bids: { $slice: -1 } }
  ).populate({
    path: "bids.buyerId",
    model: "User",
    select: "-__v -password  -email -date",
  });

  if (!findLastBid) {
    return res.status(404).send("Operation failed, Please try again");
  } else {
    res.send(findLastBid);
  }
};
const getWinnerForSpecificAuction = async (req, res) => {
  const { auctionId } = req.params;

  const findAuction = await Bid.findOne(
    { auctionId },
    { bids: { $slice: -1 } }
  ).populate({
    path: "bids.buyerId",
    model: "User",
    select: "-__v -password  -email -date",
  });
  if (!findAuction) {
    return res.status(404).send("Operation failed, Please try again");
  } else {
    res.send(findAuction);
  }
};

module.exports = {
  placeBid,
  getBidsForSpecificAuction,
  getWinnerForSpecificAuction,
  getBidsForSpecificUserAuction,
  getBidsById,
};
