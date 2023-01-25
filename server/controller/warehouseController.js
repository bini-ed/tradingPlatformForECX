const WareHouse = require("../model/warehouseModel");
const { Notification } = require("../model/notificationModel");

const getWareHouse = async (req, res) => {
  const findWarehouse = await WareHouse.find().populate({
    path: "product",
    model: "Product",
    populate: {
      path: "warehouse",
      model: "Storage",
      select: "-__v",
    },
  });
  if (!findWarehouse) {
    return res.status(404).send("Operation failed, Please try again");
  } else {
    res.send(findWarehouse);
  }
};
const getSpecificProductInWareHouse = async (req, res) => {
  const { id } = req.params;
  const findWarehouse = await WareHouse.findById(id)
    .populate({
      path: "product",
      select: "-__v",
      populate: {
        path: "seller",
        model: "User",
        select: "-password -__v -role -date",
      },
      populate: {
        path: "warehouse",
        model: "Storage",
        select: "-__v",
      },
    })
    .populate({ path: "owner", select: "-password -__v -role -date" });
  if (!findWarehouse) {
    return res.status(404).send("No product found, Please try again");
  } else {
    res.send(findWarehouse);
  }
};
const getSpecificSellerProductFromWareHouse = async (req, res) => {
  const { id } = req.user;
  const { productId } = req.params;
  const findAuction = await WareHouse.findOne({
    owner: id,
    inSale: false,
    product: productId,
  }).populate({
    path: "product",
    select: "-__v",
    populate: {
      path: "warehouse",
      model: "Storage",
      select: "-__v",
    },
  });

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
    inWarehouse: true,
  }).populate({
    path: "product",
    select: "-__v",
    populate: {
      path: "warehouse",
      model: "Storage",
      select: "-__v",
    },
  });

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
    .populate({
      path: "product",
      select: "-__v",
      populate: {
        path: "warehouse",
        model: "Storage",
        select: "-__v",
      },
    })
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
const releaseWarehouse = async (req, res) => {
  const { warehouseId } = req.params;

  const findProduct = await WareHouse.findById(warehouseId);
  if (!findProduct) return res.status(401).send("Couldn't find product");
  else {
    if (findProduct?.paymentDone) {
      const findWarehouse = await WareHouse.findByIdAndUpdate(
        warehouseId,
        {
          inWarehouse: false,
        },
        {
          new: true,
        }
      )
        .populate({
          path: "product",
          select: "-__v",
          populate: {
            path: "warehouse",
            model: "Storage",
            select: "-__v",
          },
        })
        .populate({
          path: "owner",
          model: "User",
          select: "firstName phoneNumber _id",
        });

      if (!findWarehouse)
        return res.status(401).send("Operation failed, Please try again");
      else {
        const notification = new Notification({
          message: `You take out ${
            findWarehouse.productQuantity +
            "KG of " +
            findWarehouse.product.productName
          } from our warehouse`,
          seen: false,
          date: new Date(),
          userId: findWarehouse.owner._id,
        });
        await notification.save();
        res.json({
          msg: "Prodcut released from warehouse",
          data: findWarehouse,
        });
      }
    } else {
      return res
        .status(401)
        .send("Could not release product before payment is done");
    }
  }
};

module.exports = {
  getWareHouse,
  getSpecificSellerProductFromWareHouse,
  getSellerProductFromWareHouse,
  getProductFromWareHouse,
  getSpecificProductInWareHouse,
  releaseWarehouse,
};
