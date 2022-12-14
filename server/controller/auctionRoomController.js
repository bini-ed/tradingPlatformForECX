const { default: mongoose } = require("mongoose");
const { AuctionRoom } = require("../model/auctionRoomModel");
const { Product } = require("../model/productModel");

const addProductToAuctionRoom = async (req, res) => {
  const { productId } = req.params;

  const findProduct = await Product.findById(productId);
  if (!findProduct) return res.status(404).send("Couldn't find this product");
  else {
    if (!findProduct?.grade) {
      return res
        .status(404)
        .send("Product needs to be graded before adding to auction");
    } else {
      const findIfProductIsAlreadyRegistered = await AuctionRoom.find({
        product: productId,
      });

      if (findIfProductIsAlreadyRegistered.length)
        return res
          .status(404)
          .send("This Product is already registered for upcoming auction");
      else {
        const product = new AuctionRoom({ product: productId });
        const saveProduct = await product.save();
        if (!saveProduct)
          return res.status(404).send("Couldn't add this product");
        return res.json({
          msg: "This Product is added to auction",
          data: saveProduct,
        });
      }
    }
  }
};

const addUserToAuctionRoom = async (req, res) => {
  const { auctionRoomId, productId } = req.params;
  const { id } = req.user;

  const findProduct = await Product.findById(productId);
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
  const findProduct = await AuctionRoom.find()
    .populate("product", "-__v")
    .populate("users", "-__v -password -role -date")
    .select("-__v ");

  if (!findProduct.length)
    return res.status(404).send("No auction available at the moment");

  return res.send(findProduct);
};
const getSpecificProductInAuctionRoom = async (req, res) => {
  const { productId } = req.params;
  const findProduct = await AuctionRoom.find({ product: productId }).populate({
    path: "product",
    populate: { path: "seller" },
  });

  if (!findProduct) return res.status(404).send("No product found");

  return res.send(findProduct);
};

const getSellersProductInAuctionRoom = async (req, res) => {
  const { id } = req.user;
  const findProduct = await AuctionRoom.find()
    .populate({
      path: "product",
      match: { seller: id },
      select: "-__v",
    })
    .select("-__v ")
    .exec();

  if (!findProduct) return res.status(404).send("Not product found");
  return res.send(findProduct);
};
const getEnrolledInAuctionRoom = async (req, res) => {
  const { id } = req.user;

  const findUser = await AuctionRoom.find({
    users: mongoose.Types.ObjectId(id),
  }).populate("product", "-__v");

  // const findUser = await AuctionRoom.find()
  //   .populate({
  //     path: "users",
  //     match: { _id: id },
  //     select: "-__v -password",
  //   })
  //   .populate("product", "-__v")
  //   .select("-__v ")
  //   .exec();

  if (!findUser) return res.status(404).send("Not product found");
  return res.send(findUser);
};

module.exports = {
  addProductToAuctionRoom,
  getAllProductInAuctionRoom,
  addUserToAuctionRoom,
  getSellersProductInAuctionRoom,
  getEnrolledInAuctionRoom,
  getSpecificProductInAuctionRoom,
};
