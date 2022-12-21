const experess = require("express");

const bidController = require("../controller/bidController");
const protectUrl = require("../middleware/authMiddleware.js");

const router = experess.Router();

router.post("/placeBid", protectUrl, bidController.placeBid);
router.get("/getAllBid/:auctionId", bidController.getBidsForSpecificAuction);
router.get(
  "/getBidForAuction/:auctionId/:buyerId",
  bidController.getBidsForSpecificUserAuction
);
router.get("/getWinner/:auctionId", bidController.getWinnerForSpecificAuction);

module.exports = router;
