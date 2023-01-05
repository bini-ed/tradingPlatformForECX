const experess = require("express");
const router = experess.Router();

const storageController = require("../controller/storageController");

router.get("/getStorage", storageController.getStorage);
router.get("/getStorageById/:warehouseId", storageController.getStorageById);
router.post("/addStorage", storageController.addStorage);
router.post("/updateStorage", storageController.editStorage);
router.get(
  "/getProductFromStorage/:warehouseId",
  storageController.getProductFromSpecificStorage
);

module.exports = router;
