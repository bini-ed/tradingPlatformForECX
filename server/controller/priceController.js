const Price = require("../model/priceModel");

const addPrice = async (req, res) => {
  const { priceMin, priceMax, type, grade } = req.body;
  const findPrice = await Price.find({ type, grade });
  if (!findPrice.length) {
    const newPrice = new Price({
      type,
      grade,
      priceMax,
      priceMin,
    });
    const savePrice = await newPrice.save();
    if (!savePrice)
      return res.status(401).send("Adding price for the day failed");
    else {
      return res.send("Price for the day added");
    }
  } else {
    return res.status(401).send("Price already exist");
  }
};
const getPrice = async (req, res) => {
  const { type, grade } = req.params;
  const findPrice = await Price.findOne({ type, grade });
  if (findPrice) {
    return res.send(findPrice);
  } else {
    return res.status(401).send("Price couldn't be found");
  }
};
const getPriceById = async (req, res) => {
  const { id } = req.params;
  const findPrice = await Price.findById(id);
  if (findPrice) {
    return res.send(findPrice);
  } else {
    return res.status(401).send("Price couldn't be found");
  }
};
const getAllPrice = async (req, res) => {
  const findPrice = await Price.find().select("-__v");
  if (findPrice.length) {
    return res.send(findPrice);
  } else {
    return res.status(401).send("Price couldn't be found");
  }
};
const editPrice = async (req, res) => {
  const { priceMax, priceMin, id } = req.body;
  const findPrice = await Price.findByIdAndUpdate(id, { priceMax, priceMin });
  if (findPrice) {
    return res.send("Price updated successfully");
  } else {
    return res.status(401).send("Updating price failed");
  }
};

module.exports = { addPrice, getPrice, editPrice, getAllPrice, getPriceById };
