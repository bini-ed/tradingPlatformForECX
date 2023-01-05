const Storage = require("../model/storagModel");
const WareHouse = require("../model/warehouseModel");

const getStorage = async (req, res) => {
  const findAuction = await Storage.find();
  if (!findAuction.length) {
    return res.status(404).send("No warehouse found, Please try again later");
  } else {
    res.send(findAuction);
  }
};
const getStorageById = async (req, res) => {
  const { warehouseId } = req.params;
  const findWarehouse = await Storage.findById(warehouseId);
  if (!findWarehouse) {
    return res.status(404).send("No warehouse found, Please try again later");
  } else {
    res.send(findWarehouse);
  }
};

const addStorage = async (req, res) => {
  const { warehouseName, location } = req.body;
  const findWarehouse = await Storage.findOne({
    warehouseName,
  });
  if (findWarehouse) {
    return res.status(404).send("Warehouse already exist");
  } else {
    const saveWarehouse = new Storage({
      warehouseName,
      location,
    });
    const savedWarehouse = await saveWarehouse.save();
    if (!savedWarehouse) return res.status(404).send("Warehouse not saved");
    return res.send("Warehouse saved successfully");
  }
};

const editStorage = async (req, res) => {
  const { warehouseName, location, id } = req.body;

  const updateWarehouse = await Storage.findByIdAndUpdate(
    id,
    { warehouseName, location },
    {
      new: true,
    }
  );

  if (!updateWarehouse)
    return res.status(401).send("Warehouse information not updated");
  res.json({
    msg: "Warehouse information updated successfully",
    data: updateWarehouse,
  });
};

const getProductFromSpecificStorage = async (req, res) => {
  const { warehouseId } = req.params;
  const findStorage = await Storage.findById(warehouseId);
  if (!findStorage) return res.status(404).send("Warehouse not found");
  const findProduct = await WareHouse.find()
    .populate({
      path: "product",
      match: { warehouse: warehouseId },
      populate: {
        path: "warehouse",
        model: "Storage",
      },
    })
    .populate({
      path: "owner",
      model: "User",
      select: "firstName phoneNumber -_id",
    });
  if (!findProduct?.length) {
    return res.status(404).send("Operation failed, Please try again");
  } else {
    const filterProduct = findProduct.filter((pd) => pd.product != null);
    res.send(filterProduct);
  }
};

module.exports = {
  getStorage,
  addStorage,
  editStorage,
  getStorageById,
  getProductFromSpecificStorage,
};
