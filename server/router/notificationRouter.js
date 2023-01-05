const experess = require("express");
const protectUrl = require("../middleware/authMiddleware");

const notificationController = require("../controller/notificationController");
const router = experess.Router();

router.get(
  "/getNotification",
  protectUrl,
  notificationController.getNotification
);
router.get(
  "/updateNotification/:id",
  notificationController.updateNotification
);

module.exports = router;
