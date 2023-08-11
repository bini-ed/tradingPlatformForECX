const experess = require("express");
const userController = require("../controller/userController");
const protectUrl = require("../middleware/authMiddleware");
const upload = require("../utils/upload");
const router = experess.Router();

router.post("/signUp", upload.single("payment"), userController.registerUser);
router.post("/login", userController.authUser);
router.get("/getInformation", protectUrl, userController.getUserInformation);
router.get("/getPendingUser", userController.getPendingUserInformation);
router.get("/getUserById/:userId", userController.getUserById);
router.post("/approveUser/:userId", userController.approveUser);
router.post("/updateUser", protectUrl, userController.updateUser);

module.exports = router;
