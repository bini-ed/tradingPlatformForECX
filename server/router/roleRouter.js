const express = require("express");
const router = express.Router();
const roleController = require("../controller/roleController");

router.get("/getRole", roleController.getAllRole);
router.post("/addRole", roleController.addRole);
module.exports = router;
