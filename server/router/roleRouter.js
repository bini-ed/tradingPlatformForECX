const experess = require("express");
const roleController = require("../controller/roleController");
const router = experess.Router();

router.get("/getRole", roleController.getAllRole);
router.post("/addRole", roleController.addRole);
module.exports = router;
