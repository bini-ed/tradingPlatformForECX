const { Bid } = require("../model/bidModel");

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

const getTimer = (io, auctionRoomId) => {
  countdown = 60;
  const interval = setInterval(function () {
    countdown--;
    if (countdown == 0) {
      clearInterval(interval);
      countdown = 60;
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

    socket.on("requestTimer", ({ auctionRoomId }) => {
      timer = getTimer(io, auctionRoomId);
    });

    socket.on("sendBid", async ({ auctionRoomId, chat, user }) => {
      clearInterval(timer);
      const findAuction = await Bid.findOne({ auctionRoomId });
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
            .to(auctionRoomId)
            .emit("messageError", "Bid is not sent, please try again");
        io.sockets
          .to(auctionRoomId)
          .emit("recieveBid", { savedBid, chat, user });
      } else {
        findAuction.bids.push({ buyerId: user.id, amount: chat });
        const savedBid = await (
          await findAuction.save()
        ).populate({
          path: "bids.buyerId",
          model: "User",
          select: "-__v -password  -email -date",
        });
        io.sockets
          .to(auctionRoomId)
          .emit("recieveBid", { savedBid, chat, user });
      }
    });

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
