const { default: mongoose } = require("mongoose");
const { Auction } = require("../model/auctionModel");
const { AuctionRoom } = require("../model/auctionRoomModel");
const { Notification } = require("../model/notificationModel");
const WareHouse = require("../model/warehouseModel");
const moment = require("moment");
const scheduler = require("../helper/scheduler");

const addProductToAuctionRoom = async (req, res) => {
  const { productId, productQuantity, owner } = req.params;
  const { id } = req.user;
  const now = moment();

  const findAuctionDate = await Auction.findOne().sort({ _id: -1 }).limit(1);
  // .populate({
  //   path: "auctionRoom",
  //   populate: {
  //     path: "auctionId",
  //     model: "AuctionRoom",
  //   },
  // });

  const findWarehouse = await WareHouse.findOne({
    product: productId,
    owner: owner,
  })
    .populate("product", "-__v")
    .select("-__v");

  if (!findWarehouse) return res.status(404).send("Couldn't find this product");
  else if (findWarehouse.productQuantity == 0)
    return res.status(404).send("No remaining amount in warehouse");
  else if (!findWarehouse?.product?.grade)
    return res
      .status(404)
      .send("Product needs to be graded before adding to auction");
  else {
    // if (findWarehouse?.productQuantity == productQuantity) {
    //   const findIfProductExist = await AuctionRoom.findOne({
    //     product: findWarehouse?.product?._id,
    //   });
    //   const product = new WareHouse({
    //     product: productId,
    //     productQuantity,
    //     owner: findWarehouse.owner,
    //     inSale: true,
    //   });
    //   const item = await product.save();
    //   if (!findIfProductExist) {
    //     const auction = new AuctionRoom({
    //       product: findWarehouse?._id,
    //       isActive: true,
    //       seller: id,
    //       productQuantity,
    //     });

    //     let newAuctionDate;
    //     if (!findAuctionDate) {
    //       const date = scheduler(moment(), 0);
    //       newAuctionDate = new Auction({
    //         auctionRoom: [{ auctionId: auction._id, date }],
    //       });
    //     } else if (findAuctionDate?.auctionRoom?.length < 7) {
    //       const currentAuctionDate =
    //         findAuctionDate.auctionRoom[
    //           findAuctionDate?.auctionRoom?.length - 1
    //         ].date;
    //       const auctionDate = moment(currentAuctionDate);
    //       if (
    //         now.year() > auctionDate.year() &&
    //         now.month() > auctionDate.month() &&
    //         now.date() > auctionDate.date()
    //       ) {
    //         return res.status(404).send("Couldn't add this product");
    //       } else {
    //         const date = moment(currentAuctionDate).set({
    //           hour: auctionDate.hour() + 1,
    //         });
    //         findAuctionDate?.auctionRoom.push({
    //           auctionId: auction._id,
    //           date,
    //         });
    //         newAuctionDate = findAuctionDate;
    //       }
    //     } else {
    //       const currentAuctionDate =
    //         findAuctionDate.auctionRoom[
    //           findAuctionDate?.auctionRoom?.length - 1
    //         ].date;
    //       const date = scheduler(currentAuctionDate, 1);
    //       newAuctionDate = new Auction({
    //         auctionRoom: [{ auctionId: auction._id, date }],
    //       });
    //     }

    //     console.log("warehouse", findWarehouse._id);
    //     console.log("product", productId);
    //     console.log("owner", id);

    //     const saveProduct = await auction.save();
    //     if (!saveProduct)
    //       return res.status(404).send("Couldn't add this auction");
    //     else {
    //       const saveAuction = await newAuctionDate.save();
    //       if (!saveAuction)
    //         return res.status(404).send("Couldn't add this product");
    //       else {
    //         const updateProduct = await WareHouse.findOneAndUpdate(
    //           {
    //             _id: findWarehouse._id,
    //             product: productId,
    //             owner: id,
    //           },
    //           {
    //             productQuantity: 0,
    //             inSale: false,
    //           }
    //         );
    //         if (!updateProduct)
    //           return res.status(404).send("Couldn't update this auction");
    //       }
    //     }
    //     return res.send("This Product is added to auction");
    //   } else {
    //     return res.status(404).send("This product is already added");
    //   }
    // } else.
    if (productQuantity > findWarehouse.productQuantity) {
      return res
        .status(404)
        .send("You don't have enough qunatity in warehouse");
    } else {
      const product = new WareHouse({
        product: productId,
        productQuantity,
        owner: findWarehouse.owner,
        inSale: true,
      });

      const item = await product.save();
      let newAuctionDate;
      if (item) {
        const auction = new AuctionRoom({
          product: product._id,
          isActive: true,
          seller: id,
          productQuantity,
        });

        if (!findAuctionDate) {
          const date = scheduler(moment(), 0);
          newAuctionDate = new Auction({
            auctionRoom: [{ auctionId: auction._id, date }],
          });
        } else if (findAuctionDate?.auctionRoom?.length < 7) {
          const currentAuctionDate =
            findAuctionDate.auctionRoom[
              findAuctionDate?.auctionRoom?.length - 1
            ].date;
          const auctionDate = moment(currentAuctionDate);

          if (
            now.year() > auctionDate.year() &&
            now.month() > auctionDate.month() &&
            now.date() > auctionDate.date()
          ) {
            return res.status(404).send("Couldn't add this product");
          } else {
            const date = moment(currentAuctionDate).set({
              hour: auctionDate.hour() + 1,
            });

            findAuctionDate?.auctionRoom.push({
              auctionId: auction._id,
              date,
            });
            newAuctionDate = findAuctionDate;
            // await findAuctionDate.save();
          }
        } else {
          const currentAuctionDate =
            findAuctionDate.auctionRoom[
              findAuctionDate?.auctionRoom?.length - 1
            ].date;
          const date = scheduler(currentAuctionDate, 1);
          newAuctionDate = new Auction({
            auctionRoom: [{ auctionId: auction._id, date }],
          });
        }
        const notification = new Notification({
          message: `You have added ${findWarehouse?.product?.productName} to auction`,
          seen: false,
          date: new Date(),
          userId: id,
        });

        const saveProduct = await auction.save();
        const saveAuction = await newAuctionDate.save();
        const saveNotification = await notification.save();

        if (!saveProduct || !saveAuction || !saveNotification)
          return res.status(404).send("Couldn't add this product");
        else {
          const parsedQuantity = parseInt(productQuantity);
          const newQuantity = findWarehouse.productQuantity - parsedQuantity;
          const updateProduct = await WareHouse.findOneAndUpdate(
            {
              _id: findWarehouse._id,
              product: productId,
              owner: id,
            },
            {
              productQuantity: newQuantity,
              inSale: false,
            }
          );

          if (updateProduct) {
            return res.send("This Product is added to auction");
          }
        }
      } else {
        return res.status(404).send("Operation failed in auction");
      }
    }
  }
};

const addUserToAuctionRoom = async (req, res) => {
  const { auctionRoomId, productId } = req.params;
  const { id } = req.user;

  const findProduct = await WareHouse.find({ product: productId });
  if (!findProduct) return res.status(404).send("Couldn't find this product");
  else {
    const checkAuction = await AuctionRoom.findById(auctionRoomId).populate({
      path: "product",
      model: "warehouse",
      populate: {
        path: "product",
        model: "Product",
      },
    });

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
        else {
          const notification = new Notification({
            message: `You are registered for ${
              checkAuction.product.product.productName +
              " " +
              checkAuction.product.productQuantity
            } KG auction`,
            seen: false,
            date: new Date(),
            userId: id,
          });
          const saveNotification = await notification.save();
          if (saveNotification)
            return res.send("You are registered for this auction");
        }
      }
    }
  }
};

const getAllProductInAuctionRoom = async (req, res) => {
  const findProduct = await AuctionRoom.find({ isActive: true })
    .populate({
      path: "product",
      select: "-__v",
      populate: {
        path: "product",
        select: "-__v",
        populate: {
          path: "product",
          select: "-__v",
          populate: {
            path: "warehouse",
            model: "Storage",
            select: "-__v",
          },
        },
      },
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
  })
    .populate({
      path: "product",
      populate: {
        path: "product",
        populate: {
          path: "warehouse",
          model: "Storage",
          select: "-__v",
        },

        select: "-__v",
      },
      select: "-__v",
    })
    .populate({
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
        populate: {
          path: "warehouse",
          model: "Storage",
          select: "-__v",
        },
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
  }).populate({
    path: "product",
    select: "-__v",
    populate: {
      path: "product",
      select: "-__v",
      populate: {
        path: "warehouse",
        model: "Storage",
        select: "-__v",
      },
    },
  });

  if (!findUser.length) return res.status(404).send("No Auction found");
  return res.send(findUser);
};
const getAuctionHistory = async (req, res) => {
  const { id } = req.user;
  const findUser = await AuctionRoom.find({
    users: mongoose.Types.ObjectId(id),
  })
    .populate({ path: "product", populate: { path: "product" } })
    .populate("users");

  if (!findUser.length) return res.status(404).send("No Auction found");
  return res.send(findUser);
};

const getAuctionUsingProductId = async (req, res) => {
  const { productId } = req.params;
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
