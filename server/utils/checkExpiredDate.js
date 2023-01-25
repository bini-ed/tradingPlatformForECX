const WareHouse = require("../model/warehouseModel");
const moment = require("moment");
const { User } = require("../model/userModel");
const { Product } = require("../model/productModel");
const { Notification } = require("../model/notificationModel");

const checkExpiredDate = async () => {
  const checkWareHouse = await WareHouse.find({ inWarehouse: true }).populate({
    path: "product",
    model: "Product",
  });
  const checkEcx = await User.findOne({ email: "ecx@gmail.com" });

  if (!checkWareHouse) return 0;
  else {
    checkWareHouse.map(async (wh) => {
      const remainingDate = moment(wh?.updated_at).add(30, "days");

      // if (moment("2023-02-25").isAfter(remainingDate, "day")) {
      if (moment(moment()).isAfter(remainingDate, "day")) {
        let ownerId = wh.owner._id;
        await WareHouse.findByIdAndUpdate(wh._id, {
          owner: checkEcx?._id,
        });
        await Product.findByIdAndUpdate(wh?.product?._id, {
          seller: checkEcx?._id,
        });
        const notification = new Notification({
          message: `Ownership of ${
            wh.productQuantity + " KG of " + wh?.product?.productName
          } is changed to ECX`,
          seen: false,
          date: new Date(),
          userId: ownerId,
        });

        await notification.save();
      }
    });
  }
};

module.exports = checkExpiredDate;
