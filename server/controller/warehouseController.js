const WareHouse = require("../model/warehouseModel");

const getWareHouse = async (req, res) => {
  const findAuction = await WareHouse.find().populate("product");
  if (!findAuction) {
    return res.status(404).send("Operation failed, Please try again");
  } else {
    res.send(findAuction);
  }
};
const getSpecificSellerProductFromWareHouse = async (req, res) => {
  const { id } = req.user;
  const { productId } = req.params;
  const findAuction = await WareHouse.findOne({
    owner: id,
    inSale: false,
    product: productId,
  }).populate("product");

  if (!findAuction) {
    return res.status(404).send("Operation failed, Please try again");
  } else {
    res.send(findAuction);
  }
};
const getSellerProductFromWareHouse = async (req, res) => {
  const { id } = req.user;
  const findAuction = await WareHouse.find({
    owner: id,
    productQuantity: { $gt: 0 },
  }).populate("product");

  if (!findAuction?.length) {
    return res.status(404).send("Operation failed, Please try again");
  } else {
    res.send(findAuction);
  }
};
const getProductFromWareHouse = async (req, res) => {
  const findAuction = await WareHouse.find({
    productQuantity: { $gt: 0 },
  })
    .populate("product")
    .populate({
      path: "owner",
      model: "User",
      select: "firstName phoneNumber -_id",
    });

  if (!findAuction?.length) {
    return res.status(404).send("Operation failed, Please try again");
  } else {
    res.send(findAuction);
  }
};
module.exports = {
  getWareHouse,
  getSpecificSellerProductFromWareHouse,
  getSellerProductFromWareHouse,
  getProductFromWareHouse,
};
