const experess = require("express");

const bidController = require("../controller/bidController");
const protectUrl = require("../middleware/authMiddleware.js");

const router = experess.Router();

router.post("/placeBid", protectUrl, bidController.placeBid);
router.get("/getAllBid/:auctionId", bidController.getBidsForSpecificAuction);

module.exports = router;
