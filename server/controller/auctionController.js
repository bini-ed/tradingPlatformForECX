const { Auction } = require("../model/auctionModel");

const addAuction = async (req, res) => {
  const { auctionId, date } = req.body;
  let auctionRoom = { auctionId, date };

  const findAuction = await Auction.findOne();
  if (findAuction) return res.status(404).send("Auction already exists");
  let auction = new Auction({ auctionRoom });
  const saveAuction = await auction.save();
  if (!saveAuction)
    return res.status(404).send("Operation failed, Please try again");
  return res.send("Auction added successfully");
};

const getAuction = async (req, res) => {
  const findAuction = await Auction.find().populate({
    path: "auctionRoom.auctionId",
    model: "AuctionRoom",
    match: { isActive: true },
    populate: {
      path: "product",
      model: "warehouse",
      populate: {
        path: "product",
        model: "Product",
        populate: { path: "warehouse", model: "Storage", select: "-__v" },
      },
    },
  });
  const filterAuction = findAuction.filter((fp) =>
    fp?.auctionRoom.filter(
      (fa) => fa.auctionId || (null && fa.auctionId?.product?.product != null)
    )
  );

  if (!filterAuction.length) return res.status(404).send("No role found");
  return res.send(filterAuction);
};

const findAuctionByAuctionRoomId = async (req, res) => {
  const { auctionRoomId } = req.params;

  const findAuction = await Auction.findOne({}).populate({
    path: "auctionRoom",
    populate: {
      path: "auctionId",
      model: "AuctionRoom",
      match: { _id: auctionRoomId },
    },
  });
  const getAuctionId = findAuction.auctionRoom.filter(
    (auctions) => auctions?.auctionId?._id != null
  );
  if (!getAuctionId) return res.status(404).send("No role found");
  return res.send(getAuctionId[0]);
};

module.exports = { addAuction, getAuction, findAuctionByAuctionRoomId };
