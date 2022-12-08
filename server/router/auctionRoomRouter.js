const express = require("express");
const router = express.Router();

const auctionRoomController = require("../controller/auctionRoomController");
const protectUrl = require("../middleware/authMiddleware");

router.get(
  "/getAllProductInAuctionRoom",
  auctionRoomController.getAllProductInAuctionRoom
);
router.post(
  "/addProductToAuction/:productId",
  auctionRoomController.addProductToAuctionRoom
);
router.get(
  "/addUserToAuction/:auctionRoomId/:productId",
  protectUrl,
  auctionRoomController.addUserToAuctionRoom
);
router.get(
  "/getSpecificProdcutInAuction",
  protectUrl,
  auctionRoomController.getMyProductInAuctionRoom
);
router.get(
  "/getEnrolledInAuctionRoom",
  protectUrl,
  auctionRoomController.getEnrolledInAuctionRoom
);

module.exports = router;
