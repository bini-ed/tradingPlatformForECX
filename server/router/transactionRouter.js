const express = require("express");
const router = express.Router();
const transactionController = require("../controller/transactionController");
const upload = require("../utils/upload");

router.get("/getAllTransaction", transactionController.getAllTransaction);
router.get(
  "/getUnApprovedTransaction",
  transactionController.getUnApprovedTransaction
);
router.get(
  "/getApprovedTransaction",
  transactionController.getApprovedTransaction
);
router.get(
  "/getDelayedTransaction",
  transactionController.getDelayedTransaction
);
router.get(
  "/getTransactionDetail/:transactionId",
  transactionController.getTransactionDetail
);
router.post(
  "/approveTransaction/:warehouseId/:transactionId",
  transactionController.approveTransaction
);
router.get(
  "/getTransactionForSpecificBid/:bidId",
  transactionController.getTransactionForSpecificBid
);
router.post(
  "/addTransaction/:bidId",
  upload.single("document"),
  transactionController.addTransaction
);
router.get("/penalizeUser/:transactionId", transactionController.penalizeUser);

module.exports = router;
