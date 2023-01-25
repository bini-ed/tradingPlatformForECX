const { Auction } = require("../model/auctionModel");
const { AuctionRoom } = require("../model/auctionRoomModel");

const auctionStarter = async () => {
  const findAuction = await Auction.find().populate({
    path: "auctionRoom.auctionId",
    model: "AuctionRoom",
    populate: {
      path: "product",
      model: "warehouse",
      populate: {
        path: "product",
        model: "Product",
        populate: {
          path: "warehouse",
          model: "Storage",
          select: "-__v",
        },
      },
    },
  });
  if (!findAuction.length) return 0;
  else {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();

    findAuction.map((fa) =>
      fa.auctionRoom.map(async (ar) => {
        const auctionMonth = ar?.date?.getMonth() + 1;
        const auctionDay = ar?.date?.getDate();
        const auctionHour = ar?.date?.getHours();

        if (
          auctionMonth == month &&
          auctionDay == day &&
          auctionHour == hour &&
          ar?.auctionId?.isStarted == false
        ) {
          const updateAuctionROom = await AuctionRoom.findByIdAndUpdate(
            ar?.auctionId?._id,
            { isStarted: true }
          );
          if (updateAuctionROom) console.log("Updated");
        }

        if (
          auctionMonth == month ||
          auctionDay == day ||
          (auctionHour + 1 < hour && ar?.auctionId?.isStarted == true)
        ) {
          const updateAuctionROom = await AuctionRoom.findByIdAndUpdate(
            ar?.auctionId?._id,
            { isStarted: false }
          );
          // if (updateAuctionROom) console.log("Updated");
        }
      })
    );
  }
};

module.exports = auctionStarter;
