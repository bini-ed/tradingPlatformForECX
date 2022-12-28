const { AuctionRoom } = require("../model/auctionRoomModel");
const { Bid } = require("../model/bidModel");
const WareHouse = require("../model/warehouseModel");

var countdown = 60;

// var Room = function (io, auctionRoomId) {
//   this.io = io;
//   this.auctionRoomId = auctionRoomId;
//   this.timer = this.timerFunction.bind(this);
// };

// Room.prototype.timerFunction = function () {
//   console.log(this.io, this.auctionRoomId);
//   countdown = 60;
//   const interval = setInterval(function () {
//     countdown--;
//     if (countdown == 0) {
//       clearInterval(interval);
//       countdown = 60;
//     }
//     this.io.sockets.to(this.auctionRoomId).emit("getTimer", { countdown });
//   }, 1000);
//   return interval;
// };

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
    if (countdown == 50) {
      clearInterval(interval);
      const findWinner = await Bid.findOne(
        { auctionId: auctionRoomId },
        { bids: { $slice: -1 } }
      );
      if (!findWinner) {
        return res.status(404).send("Operation failed, Please try again");
      } else {
        console.log(findWinner);
        const warehouse = await WareHouse.findOneAndUpdate(
          {
            _id: productId,
            productQuantity,
            owner: seller,
            inSale: true,
          },
          { owner: findWinner?.bids[0]?.buyerId?._id, inSale: false }
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
            io.sockets
              .to(auctionRoomId)
              .emit("auctionDone", { auctionDone: true, winner: findWinner });
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

const socketRouter = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinAuctionRoom", async ({ user, auctionRoomId }) => {
      socket.join(auctionRoomId);
    });

    // socket.on("requestTimer", ({ auctionRoomId }) => {
    //   timer = getTimer(io, auctionRoomId);
    // });

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
