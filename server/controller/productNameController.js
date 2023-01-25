const ProductName = require("../model/productNameModel");

const addProductName = async (req, res) => {
  const { productName, grade } = req.body;
  let grades = [];
  if (!grade.length) return res.status(401).send("Grade is a required field");
  grade?.map((grade) => {
    grades.push(grade.grade);
  });

  const findPrice = await ProductName.findOne({ productName });
  if (!findPrice) {
    const newPoductName = new ProductName();
    newPoductName.productName = productName;
    newPoductName.grade = grades;
    const saveProductName = await newPoductName.save();
    if (!saveProductName) return res.status(401).send("Product name not added");
    else {
      return res.send("Product name added successfully");
    }
  } else {
    return res.status(401).send("Product name already exist");
  }
};

const getProductNameById = async (req, res) => {
  const { id } = req.params;
  const findProductName = await ProductName.findById(id);
  if (findProductName) {
    return res.send(findProductName);
  } else {
    return res.status(401).send("Product name couldn't be found");
  }
};
const getAllProductName = async (req, res) => {
  const findProductName = await ProductName.find().select("-__v");
  if (findProductName.length) {
    return res.send(findProductName);
  } else {
    return res.status(401).send("Product name couldn't be found");
  }
};
const editProductName = async (req, res) => {
  const { productName, id } = req.body;
  const findPrice = await ProductName.findByIdAndUpdate(id, {
    productName,
  });
  if (findPrice) {
    return res.send("Product name updated successfully");
  } else {
    return res.status(401).send("Updating product name failed");
  }
};

module.exports = {
  addProductName,
  editProductName,
  getAllProductName,
  getProductNameById,
};
