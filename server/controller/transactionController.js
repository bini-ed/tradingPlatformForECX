const { AuctionRoom } = require("../model/auctionRoomModel");
const { Bid } = require("../model/bidModel");
const Transaction = require("../model/transactionModel");
const WareHouse = require("../model/warehouseModel");

const addTransaction = async (req, res) => {
  const file = req.file?.filename;
  const { bidId } = req.params;

  const findBid = await Bid.findById(bidId).populate("auctionId");

  if (findBid) {
    const findTrans = await Transaction.find({ bid: bidId });
    if (!findTrans.length) {
      const newTrans = new Transaction({
        price: file,
        bid: bidId,
      });
      const savedTrans = await newTrans.save();
      if (savedTrans)
        return res.send(
          "Transaction submitted,please wait till the admins approve it"
        );
      else {
        return res.status().send("Error saving transaction");
      }
    } else {
      return res.status(404).send("Please wait till we approve the payment");
    }
  } else return res.status(404).send("No bid found");
};

const getTransactionForSpecificBid = async (req, res) => {
  const { bidId } = req.params;

  const findBid = await Bid.findById(bidId, { bids: { $slice: -1 } }).populate(
    "auctionId"
  );

  if (findBid) return res.send(findBid);
  else return res.status(404).send("No bid found");
};
const getTransactionDetail = async (req, res) => {
  const { transactionId } = req.params;

  const findBid = await Transaction.findById(transactionId)
    .populate({
      path: "bid",
      populate: {
        path: "auctionId",
        populate: { path: "product", populate: { path: "product" } },
      },
    })
    .populate({
      path: "bid",
      populate: { path: "bids", populate: { path: "buyerId" } },
    });

  if (findBid) return res.send(findBid);
  else return res.status(404).send("No bid found");
};

const getAllTransaction = async (req, res) => {
  const findBid = await Transaction.find()
    .populate({
      path: "bid",
      populate: {
        path: "auctionId",
        populate: { path: "product", populate: { path: "product" } },
      },
    })
    .populate({
      path: "bid",
      populate: { path: "bids", populate: { path: "buyerId" } },
    });

  if (findBid.length) return res.send(findBid);
  else return res.status(404).send("No bid found");
};
const approveTransaction = async (req, res) => {
  const { warehouseId, transactionId } = req.params;

  const finAuction = await AuctionRoom.findOne({ product: warehouseId });
  const findTransaction = await Transaction.findById(transactionId);
  if (!findTransaction)
    return res.status(404).send("Transaction can't be found");
  else if (!finAuction) {
    return res.status(404).send("Auction Room can't be found");
  } else {
    const findWarehouse = await WareHouse.findById(warehouseId);
    if (!findWarehouse)
      return res.status(404).send("No product found in warehouse with this id");
    else {
      const updateWarehouse = await WareHouse.findByIdAndUpdate(warehouseId, {
        paymentDone: true,
      });
      const updateAuctionRoom = await AuctionRoom.findByIdAndUpdate(
        finAuction._id,
        {
          isDone: true,
        }
      );
      const updateTransaction = await Transaction.findByIdAndUpdate(
        transactionId,
        {
          approved: true,
        }
      );
      if (updateWarehouse && updateTransaction && updateAuctionRoom)
        res.send("Transaction approved");
      else res.status(404).send("Transaction cant be approved");
    }
  }
};

module.exports = {
  addTransaction,
  getTransactionForSpecificBid,
  getAllTransaction,
  getTransactionDetail,
  approveTransaction,
};
