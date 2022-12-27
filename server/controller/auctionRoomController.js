const { default: mongoose } = require("mongoose");
const { Auction } = require("../model/auctionModel");
const { AuctionRoom } = require("../model/auctionRoomModel");
const WareHouse = require("../model/warehouseModel");
const moment = require("moment");

const addProductToAuctionRoom = async (req, res) => {
  const { productId, productQuantity, owner } = req.params;
  const { id } = req.user;

  const findAuctionDate = await Auction.find();
  // .populate({
  //   path: "auctionRoom",
  //   populate: {
  //     path: "auctionId",
  //     model: "AuctionRoom",
  //   },
  // });

  if (!findAuctionDate)
    return res.status(404).send("Couldn't fetch auction information");
  else {
    const nowDate = moment(Date.now()).format("DD-dd-MM-YY-hh-A").split("-");
    const nowYears = moment(findAuctionDate[0].auctionRoom[0].date)
      .format("DD-ddd-MM-YY-hh-A")
      .split("-");

    const nowDay = nowYears[0];
    const nowDayNumber = nowYears[1];
    const nowMonth = nowYears[2];
    const nowYear = nowYears[3];
    const nowTime = nowYears[4];
    const nowTimeFormat = nowYears[5];

    const day = nowYears[0];
    const dayNumber = nowYears[1];
    const month = nowYears[2];
    const year = nowYears[3];
    const time = nowYears[4];
    const timeFormat = nowYears[5];

    // const findProduct = await WareHouse.findOne({
    //   product: productId,
    //   owner: owner,
    // })
    //   .populate("product", "-__v")
    //   .select("-__v");

    // if (!findProduct) return res.status(404).send("Couldn't find this product");
    // else if (findProduct.productQuantity == 0) {
    //   return res.status(404).send("No remaining amount in warehouse");
    // } else {
    //   if (!findProduct?.product?.grade) {
    //     return res
    //       .status(404)
    //       .send("Product needs to be graded before adding to auction");
    //   } else {
    //     if (findProduct.product.productQuantity == productQuantity) {
    //       const findIfProductExist = await AuctionRoom.findOne({
    //         product: productId,
    //       });

    //       if (!findIfProductExist) {
    //         const findAuctionDate = await Auction.find();

    //         if (!findAuctionDate)
    //           return res.status(404).send("Couldn't fetch auction information");
    //         else {
    //           if (findAuctionDate?.auctionRoom?.length === 7) {
    //             const now = new Date.now();
    //           }

    //           const product = new AuctionRoom({
    //             product: productId,
    //             isActive: true,
    //             seller: id,
    //           });
    //           const saveProduct = await product.save();
    //           if (!saveProduct)
    //             return res.status(404).send("Couldn't add this product");
    //           return res.send("This Product is added to auction");
    //         }
    //       } else {
    //         return res.status(404).send("This product is already added");
    //       }
    //     } else if (productQuantity > findProduct.productQuantity) {
    //       return res
    //         .status(404)
    //         .send("You don't have enought qunatity in warehouse");
    //     } else {
    //       const product = new WareHouse({
    //         product: productId,
    //         productQuantity,
    //         owner: findProduct.product.seller,
    //         inSale: true,
    //       });
    //       const item = await product.save();
    //       if (item) {
    //         const addProduct = new AuctionRoom({
    //           product: item._id,
    //           isActive: true,
    //           seller: id,
    //         });
    //         const saveProduct = await addProduct.save();
    //         if (!saveProduct)
    //           return res.status(404).send("Couldn't add this product");
    //         else {
    //           const parsedQuantity = parseInt(productQuantity);
    //           const newQuantity = findProduct.productQuantity - parsedQuantity;
    //           const updateProduct = await WareHouse.findOneAndUpdate(
    //             { product: productId },
    //             {
    //               productQuantity: newQuantity,
    //               inSale: false,
    //             }
    //           );
    //           if (updateProduct)
    //             return res.send("This Product is added to auction");
    //         }
    //       }
    //     }
    //   }
    // }
  }
};

const addUserToAuctionRoom = async (req, res) => {
  const { auctionRoomId, productId } = req.params;
  const { id } = req.user;

  const findProduct = await WareHouse.find({ product: productId });
  if (!findProduct) return res.status(404).send("Couldn't find this product");
  else {
    const checkAuction = await AuctionRoom.findById(auctionRoomId);

    if (checkAuction?.length)
      return res
        .status(404)
        .send("This auction is not available at the moment");
    else {
      const checkUser = await AuctionRoom.findOne({
        _id: auctionRoomId,
        users: id,
      });

      if (checkUser) {
        return res
          .status(404)
          .send("You are already registered for this auction");
      } else {
        const saveProduct = await AuctionRoom.findOneAndUpdate(
          { _id: auctionRoomId, product: productId },
          {
            $push: {
              users: id,
            },
          }
        );
        if (!saveProduct) return res.status(404).send("Couldn't add this user");
        return res.send("You are registered for this auction");
      }
    }
  }
};

const getAllProductInAuctionRoom = async (req, res) => {
  const findProduct = await AuctionRoom.find({ isActive: true })
    .populate({
      path: "product",
      select: "-__v",
      populate: { path: "product", select: "-__v" },
    })
    .populate("users", "-__v -password -role -date");

  if (!findProduct.length)
    return res.status(404).send("No auction available at the moment");

  return res.send(findProduct);
};
const getSpecificProductInAuctionRoom = async (req, res) => {
  const { productId } = req.params;

  const findProduct = await AuctionRoom.findOne({
    product: productId,
  }).populate({
    path: "product",
    populate: {
      path: "product",
      populate: {
        path: "seller",
        select: "-__v -password -email -phoneNumber -role -date ",
      },
      select: "-__v",
    },
    select: "-__v",
  });

  if (!findProduct) return res.status(404).send("No product found");
  return res.send(findProduct);
};

const getSellersProductInAuctionRoom = async (req, res) => {
  const { id } = req.user;

  const findProduct = await AuctionRoom.find({ seller: id })
    .populate({
      path: "product",
      select: "-__v",
      populate: {
        path: "product",
        select: "-__v",
      },
    })
    .populate("users", "-__v -password -role -date")
    .select("-__v ");
  // .populate({
  //   path: "product",
  //   select: "-__v",
  //   match: { owner: id },
  //   populate: {
  //     path: "product",
  //     select: "-__v",
  //   },
  // })

  if (!findProduct.length) return res.status(404).send("No product found");
  return res.send(findProduct);
};

const getEnrolledInAuctionRoom = async (req, res) => {
  const { id } = req.user;
  const findUser = await AuctionRoom.find({
    users: mongoose.Types.ObjectId(id),
    isActive: true,
  }).populate({ path: "product", populate: { path: "product" } });
  if (!findUser.length) return res.status(404).send("Not product found");
  return res.send(findUser);
};
const getAuctionHistory = async (req, res) => {
  const { id } = req.user;
  const findUser = await AuctionRoom.find({
    users: mongoose.Types.ObjectId(id),
  })
    .populate({ path: "product", populate: { path: "product" } })
    .populate("users");

  if (!findUser.length) return res.status(404).send("Not product found");
  return res.send(findUser);
};

const getAuctionUsingProductId = async (req, res) => {
  const { productId } = req.params;
  console.log(productId);
  const findUser = await AuctionRoom.findOne({
    product: productId,
  }).populate({ path: "product", populate: { path: "product" } });

  if (!findUser) return res.status(404).send("No Auction found");
  return res.send(findUser);
};

module.exports = {
  addProductToAuctionRoom,
  getAllProductInAuctionRoom,
  addUserToAuctionRoom,
  getSellersProductInAuctionRoom,
  getEnrolledInAuctionRoom,
  getSpecificProductInAuctionRoom,
  getAuctionUsingProductId,
  getAuctionHistory,
};
