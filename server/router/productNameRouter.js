const express = require("express");
const productController = require("../controller/productNameController");
const router = express.Router();

router.get("/getProductNameById/:id", productController.getProductNameById);
router.get("/getAllProductName", productController.getAllProductName);
router.post("/editProductName", productController.editProductName);
router.post("/addProductName", productController.addProductName);

module.exports = router;
