const { default: mongoose } = require("mongoose");
const { Auction } = require("../model/auctionModel");
const { AuctionRoom } = require("../model/auctionRoomModel");
const { User } = require("../model/userModel");
const { Notification } = require("../model/notificationModel");
const WareHouse = require("../model/warehouseModel");
const moment = require("moment");
const scheduler = require("../helper/scheduler");
const sendSMS = require("../utils/sendSMS");
const Price = require("../model/priceModel");

const addProductToAuctionRoom = async (req, res) => {
  const { productId, productQuantity, owner, minPrice } = req.params;
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
    if (productQuantity > findWarehouse.productQuantity) {
      return res
        .status(404)
        .send("You don't have enough qunatity in warehouse");
    } else {
      const findPrice = await Price.findOne({
        type: findWarehouse?.product?.productType.toLowerCase(),
        grade: findWarehouse?.product?.grade,
      });
      if (findPrice) {
        if (minPrice > findPrice?.priceMax || minPrice < findPrice?.priceMin) {
          return res
            .status(404)
            .send("Starting price should be in the range of the daily price");
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
              minPrice,
            });

            if (!findAuctionDate) {
              const date = scheduler(moment());
              // console.log("d1", date);
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
                // console.log(
                //   "d2",
                //   moment(currentAuctionDate).format("dd-DD-MM-YYYY hh:mm")
                // );
                // console.log("d2", moment(date).format("dd-DD-MM-YYYY hh:mm"));

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
              // console.log("d3", date);
            }
            const notification = new Notification({
              message: `You have added ${findWarehouse?.productQuantity}KG of ${findWarehouse?.product?.productName} to auction`,
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
              const newQuantity =
                findWarehouse.productQuantity - parsedQuantity;
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
              const findUser = await User.findById(owner);
              if (findUser) {
                const data = await sendSMS(
                  findUser?.phoneNumber,
                  `You have added ${findWarehouse?.productQuantity}KG of ${findWarehouse?.product?.productName} to auction`
                );
                if (data?.status == 200) console.log("SMS notification sent");
                else console.log("SMS notification not sent");
              }
              if (updateProduct) {
                return res.send("This Product is added to auction");
              }
            }
          } else {
            return res.status(404).send("Operation failed in auction");
          }
        }
      } else {
        return res.status(401).send("Price couldn't be found");
      }
    }
  }
};

const addUserToAuctionRoom = async (req, res) => {
  const { auctionRoomId, productId, date } = req.body;
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
              checkAuction?.product?.product?.productName +
              " " +
              checkAuction?.product?.productQuantity
            } KG auction that will be held on ${date}`,
            seen: false,
            date: new Date(),
            userId: id,
          });

          const saveNotification = await notification.save();
          const findUser = await User.findById(id);
          if (findUser)
            sendSMS(
              findUser?.phoneNumber,
              `You are registered for ${
                checkAuction?.product?.product?.productName +
                " " +
                checkAuction?.product?.productQuantity
              } KG auction that will be held on ${date}`
            );
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
    })
    .populate({
      path: "seller",
      select: "-__v -password -email -phoneNumber -role -date ",
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
const getAuction = async (req, res) => {
  const findAuction = await AuctionRoom.find({ isActive: true })
    .populate({
      path: "product",
      populate: { path: "product" },
    })
    .populate("seller", "User");

  if (!findAuction.length) return res.status(404).send("No Auction found");
  return res.send(findAuction);
};
const startAuction = async (req, res) => {
  const { auctionRoomId } = req.params;
  const findAuction = await AuctionRoom.findByIdAndUpdate(
    auctionRoomId,
    {
      isStarted: true,
    },
    { new: true }
  ).populate({
    path: "product",
    populate: { path: "product" },
  });

  if (!findAuction) return res.status(404).send("No Auction found");
  return res.send(findAuction);
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
  startAuction,
  getAuction,
};
