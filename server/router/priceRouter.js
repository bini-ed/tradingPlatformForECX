const express = require("express");
const priceController = require("../controller/priceController");
const router = express.Router();

router.get("/getPriceById/:id", priceController.getPriceById);
router.get("/getPrice/:type/:grade", priceController.getPrice);
router.get("/getAllPrice", priceController.getAllPrice);
router.post("/editPrice", priceController.editPrice);
router.post("/addPrice", priceController.addPrice);

module.exports = router;
