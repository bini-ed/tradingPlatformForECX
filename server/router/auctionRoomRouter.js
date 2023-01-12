const express = require("express");
const router = express.Router();

const auctionRoomController = require("../controller/auctionRoomController");
const protectUrl = require("../middleware/authMiddleware");

router.get(
  "/getAllProductInAuctionRoom",
  auctionRoomController.getAllProductInAuctionRoom
);
router.get(
  "/addProductToAuction/:productId/:productQuantity/:owner",
  protectUrl,
  auctionRoomController.addProductToAuctionRoom
);
router.get(
  "/addUserToAuction/:auctionRoomId/:productId",
  protectUrl,
  auctionRoomController.addUserToAuctionRoom
);
router.get(
  "/getSellersProductInAuctionRoom",
  protectUrl,
  auctionRoomController.getSellersProductInAuctionRoom
);
router.get(
  "/getSpecificProductInAuctionRoom/:productId",
  auctionRoomController.getSpecificProductInAuctionRoom
);
router.get(
  "/getEnrolledInAuctionRoom",
  protectUrl,
  auctionRoomController.getEnrolledInAuctionRoom
);
router.get(
  "/getAuction/:productId",
  auctionRoomController.getAuctionUsingProductId
);
router.get("/startAuction/:auctionRoomId", auctionRoomController.startAuction);
router.get("/getAllAuction", auctionRoomController.getAuction);
router.get(
  "/getAuctionHistory",
  protectUrl,
  auctionRoomController.getAuctionHistory
);

module.exports = router;
