const experess = require("express");

const wareHouserController = require("../controller/warehouseController");
const protectUrl = require("../middleware/authMiddleware");

const router = experess.Router();

router.get("/getWarehouse", wareHouserController.getWareHouse);
router.get(
  "/getSellerProduct",
  protectUrl,
  wareHouserController.getSellerProductFromWareHouse
);
router.get(
  "/getSpecificSellerProduct/:productId",
  protectUrl,
  wareHouserController.getSpecificSellerProductFromWareHouse
);

module.exports = router;
