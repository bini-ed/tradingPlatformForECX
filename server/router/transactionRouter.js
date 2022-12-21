const express = require("express");
const router = express.Router();
const transactionController = require("../controller/transactionController");
const upload = require("../utils/upload");

router.post(
  "/addTransaction/:bidId",
  upload.single("document"),
  transactionController.addTransaction
);
router.get(
  "/getTransactionForSpecificBid/:bidId",
  transactionController.getTransactionForSpecificBid
);
router.get("/getAllTransaction", transactionController.getAllTransaction);
router.get(
  "/getTransactionDetail/:transactionId",
  transactionController.getTransactionDetail
);
router.post(
  "/approveTransaction/:warehouseId/:transactionId",
  transactionController.approveTransaction
);

module.exports = router;
