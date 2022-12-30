const { Auction } = require("../model/auctionModel");
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
      ).populate({
        path: "bids.buyerId",
        model: "User",
        select: "-__v -password  -email -date",
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

const AuctionTime = async (
  io,
  auctionRoomId,
  productId,
  user,
  productQuantity,
  seller
) => {
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
  const endTime = getAuctionId[0].date.getTime() + 60 * 60 * 1000;
  const timer = setInterval(async function () {
    const now = new Date().getTime();
    const distance = endTime - now;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      clearInterval(timer);
      //   const findWinner = await Bid.findOne(
      //     { auctionId: auctionRoomId },
      //     { bids: { $slice: -1 } }
      //   ).populate({
      //     path: "bids.buyerId",
      //     model: "User",
      //     select: "-__v -password  -email -date",
      //   });

      //   if (!findWinner) {
      //     return io.sockets
      //       .to(socket.id)
      //       .emit("messageError", "Operation failed, Please try again");
      //   } else {
      //     const warehouse = await WareHouse.findOneAndUpdate(
      //       {
      //         _id: productId,
      //         productQuantity,
      //         owner: seller,
      //         inSale: true,
      //       },
      //       {
      //         owner: findWinner?.bids[0]?.buyerId?._id,
      //         inSale: false,
      //         bought: true,
      //       }
      //     );
      //     if (warehouse) {
      //       const auctionRoom = await AuctionRoom.findByIdAndUpdate(
      //         auctionRoomId,
      //         {
      //           isStarted: false,
      //           isActive: false,
      //           // users: [],
      //         }
      //       );
      //       if (!auctionRoom) console.log("auctionRoom err");
      //       else {
      //         io.sockets
      //           .to(auctionRoomId)
      //           .emit("auctionDone", { auctionDone: true, winner: findWinner });
      //       }
      //     } else {
      //       console.log("warehouse error");
      //     }
      //   }
      io.emit("timesup");
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
        AuctionTime(
          io,
          auctionRoomId,
          productId,

          productQuantity,
          seller
        );
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

// const countdown = (io) => {
//   // Set the end time for the countdown
//   const endTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour in milliseconds

//   // Update the count down every 1 second
//   const timer = setInterval(() => {
//     // Get the current time
//     const now = new Date().getTime();

//     // Find the distance between now and the end time
//     const distance = endTime - now;

//     // Time calculations for minutes and seconds
//     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     // Emit the countdown event to all connected clients
//     io.emit("countdown", { minutes, seconds });

//     // If the count down is finished, clear the timer and emit a "timesup" event
//     if (distance < 0) {
//       clearInterval(timer);
//       io.emit("timesup");
//     }
//   }, 1000); // update every 1 second (1000 milliseconds)
// };

// module.exports = countdown;
