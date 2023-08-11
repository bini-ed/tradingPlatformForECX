const { Auction } = require("../model/auctionModel");
const { AuctionRoom } = require("../model/auctionRoomModel");
const { Bid } = require("../model/bidModel");
const { Notification } = require("../model/notificationModel");
const WareHouse = require("../model/warehouseModel");

var countdown = 60;

const getTimer = (
  io,
  auctionRoomId,
  productId,
  user,
  productQuantity,
  seller
) => {
  countdown = 60;
  const interval = setInterval(async function () {
    countdown--;
    if (countdown == 0) {
      clearInterval(interval);
      const findWinner = await Bid.findOne(
        { auctionId: auctionRoomId },
        { bids: { $slice: -1 } }
      )
        .populate({
          path: "bids.buyerId",
          model: "User",
          select: "-__v -password  -email -date",
        })
        .populate({
          path: "auctionId",
          model: "AuctionRoom",
          populate: {
            path: "product",
            model: "warehouse",
            populate: {
              path: "product",
              model: "Product",
            },
          },
          select: "-__v ",
        });

      if (!findWinner) {
        return io.sockets
          .to(socket.id)
          .emit("messageError", "Operation failed, Please try again");
      } else {
        const warehouse = await WareHouse.findOneAndUpdate(
          {
            _id: productId,
            productQuantity,
            owner: seller,
            inSale: true,
          },
          {
            owner: findWinner?.bids[0]?.buyerId?._id,
            inSale: false,
            bought: true,
          }
        );
        if (warehouse) {
          const auctionRoom = await AuctionRoom.findByIdAndUpdate(
            auctionRoomId,
            {
              isStarted: false,
              isActive: false,
              // users: [],
            }
          );
          if (!auctionRoom) console.log("auctionRoom err");
          else {
            const notification = new Notification({
              message: `You have won the auction for ${
                findWinner?.auctionId?.product?.product.productName +
                " " +
                productQuantity
              }`,
              seen: false,
              date: new Date(),
              userId: findWinner?.bids[0]?.buyerId?._id,
            });
            const saveNotification = await notification.save();
            if (saveNotification)
              io.sockets
                .to(auctionRoomId)
                .emit("auctionDone", { auctionDone: true, winner: findWinner });
            else {
              console.log("notification err");
            }
          }
        } else {
          console.log("warehouse error");
        }
      }
    }
    io.sockets.to(auctionRoomId).emit("getTimer", { countdown });
  }, 1000);
  return interval;
};
let timer;

const AuctionTime = async (
  io,
  auctionRoomId,
  productId,
  productQuantity,
  seller
) => {
  const findAuction = await Auction.findOne().populate({
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
  const endTime = getAuctionId[0]?.date?.getTime()
    ? getAuctionId[0]?.date?.getTime() + 60 * 60 * 1000
    : 1674717650262 + 60 * 60 * 1000;

  const timer = setInterval(async function () {
    const now = new Date().getTime();
    const timerEnd = endTime - now;
    const minutes = Math.floor((timerEnd % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timerEnd % (1000 * 60)) / 1000);

    if (timerEnd <= 1) {
      clearInterval(timer);
      const findWinner = await Bid.findOne(
        { auctionId: auctionRoomId },
        { bids: { $slice: -1 } }
      )
        .populate({
          path: "bids.buyerId",
          model: "User",
          select: "-__v -password  -email -date",
        })
        .populate({
          path: "auctionId",
          model: "AuctionRoom",
          populate: {
            path: "product",
            model: "warehouse",
            populate: {
              path: "product",
              model: "Product",
            },
          },
          select: "-__v ",
        });

      if (!findWinner) {
        return io.sockets
          .to(auctionRoomId)
          .emit("messageError", "Operations failed, Please try again");
      } else {
        const warehouse = await WareHouse.findOneAndUpdate(
          {
            _id: productId,
            productQuantity,
            owner: seller,
            inSale: true,
          },
          {
            owner: findWinner?.bids[0]?.buyerId?._id,
            inSale: false,
            bought: true,
          }
        );
        if (warehouse) {
          const auctionRoom = await AuctionRoom.findByIdAndUpdate(
            auctionRoomId,
            {
              isStarted: false,
              isActive: false,
              // users: [],
            }
          );
          if (!auctionRoom) console.log("auctionRoom err");
          else {
            const notification = new Notification({
              message: `You have won the auction for ${
                findWinner?.auctionId?.product?.product.productName +
                " " +
                productQuantity
              }`,
              seen: false,
              date: new Date(),
              userId: findWinner?.bids[0]?.buyerId?._id,
            });
            const saveNotification = await notification.save();

            if (saveNotification)
              io.sockets
                .to(auctionRoomId)
                .emit("auctionDone", { auctionDone: true, winner: findWinner });
          }
        } else {
          return io.sockets
            .to(auctionRoomId)
            .emit("messageError", "Operation failed, Please try again");
        }
      }
    }
    io.sockets.to(auctionRoomId).emit("auctionTime", { minutes, seconds });
  }, 1000);
};

const socketRouter = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinAuctionRoom", async ({ user, auctionRoomId }) => {
      socket.join(auctionRoomId);
    });

    socket.on(
      "getAuctionTime",
      async ({ auctionRoomId, productId, productQuantity, seller }) => {
        AuctionTime(io, auctionRoomId, productId, productQuantity, seller);
      }
    );

    socket.on(
      "sendBid",
      async ({
        auctionRoomId,
        chat,
        user,
        productId,
        productQuantity,
        seller,
      }) => {
        const findAuction = await Bid.findOne({ auctionId: auctionRoomId });
        if (!findAuction) {
          const bidSchema = {
            auctionId: auctionRoomId,
            bids: { buyerId: user.id, amount: chat },
          };

          let bid = new Bid(bidSchema);
          const savedBid = await (
            await bid.save()
          ).populate({
            path: "bids.buyerId",
            model: "User",
            select: "-__v -password  -email -date",
          });
          if (!savedBid)
            return io.sockets
              .to(socket.id)
              .emit("messageError", "Bid is not sent, please try again");
          else {
            clearInterval(timer);
            timer = getTimer(
              io,
              auctionRoomId,
              productId,
              user,
              productQuantity,
              seller
            );
            io.sockets
              .to(auctionRoomId)
              .emit("recieveBid", { savedBid, chat, user });
          }
        } else {
          const parsed = parseInt(chat);
          const findLastBid = await Bid.findOne(
            { auctionId: auctionRoomId },
            { bids: { $slice: -1 } }
          );

          if (parsed <= findLastBid.bids[0].amount) {
            io.sockets
              .to(socket.id)
              .emit("messageError", "Bid is smaller than current price");
          } else {
            findAuction.bids.push({ buyerId: user.id, amount: chat });
            const savedBid = await (
              await findAuction.save()
            ).populate({
              path: "bids.buyerId",
              model: "User",
              select: "-__v -password  -email -date",
            });
            clearInterval(timer);
            timer = getTimer(
              io,
              auctionRoomId,
              productId,
              user,
              productQuantity,
              seller
            );
            io.sockets
              .to(auctionRoomId)
              .emit("recieveBid", { savedBid, chat, user });
          }
        }
      }
    );

    socket.on("leaveAuctionRoom", ({ roomId, user }) => {
      socket.leave(roomId?.toString());
      console.log(`${user.firstName} left room`);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });
};

module.exports = socketRouter;
