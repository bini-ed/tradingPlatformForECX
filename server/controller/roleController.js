const Role = require("../model/roleModel");

const addRole = async (req, res) => {
  const { roleName } = req.body;

  const findRole = await Role.findOne({ roleName: roleName.toLowerCase() });
  if (findRole) return res.status(404).send("Role already exists");
  let role = new Role({ roleName });
  const saveRole = await role.save();
  if (!saveRole)
    return res.status(404).send("Operation failed, Please try again");
  return res.send("Role added successfully");
};

const getAllRole = async (req, res) => {
  const findRole = await Role.find();
  if (!findRole) return res.status(404).send("No role found");
  return res.send(findRole);
};

module.exports = { addRole, getAllRole };
