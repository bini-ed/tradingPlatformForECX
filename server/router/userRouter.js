const experess = require("express");
const userController = require("../controller/userController");
const protectUrl = require("../middleware/authMiddleware");
const router = experess.Router();

router.post("/signUp", userController.registerUser);
router.post("/login", userController.authUser);
router.get("/getInformation", protectUrl, userController.getUserInformation);
router.post("/updateUser", protectUrl, userController.updateUser);
module.exports = router;
