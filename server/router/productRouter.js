const experess = require("express");
const productController = require("../controller/productController.js");
const {
  adminMiddleware,
  wareHouserMiddleware,
} = require("../middleware/adminMiddleware.js");
const protectUrl = require("../middleware/authMiddleware.js");
const router = experess.Router();

router.get(
  "/getAllProduct",
  //  adminMiddleware
  productController.getAllProduct
);
router.get("/getMyProduct", protectUrl, productController.getMyProduct);
router.post("/addProduct", adminMiddleware, productController.addProduct);
module.exports = router;
