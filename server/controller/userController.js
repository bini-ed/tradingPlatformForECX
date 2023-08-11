const { validate, User } = require("../model/userModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role, phoneNumber, bank } =
    req.body;

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email });
  if (user)
    return res
      .status(400)
      .send("User is already registered,Try again with another email!!");
  else {
    user = new User({
      firstName,
      lastName,
      phoneNumber,
      role,
      email,
      password,
      bank,
    });
    const salt = await bcrypt.genSalt(15);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    // const token = user.generateToken();

    res.send("User registered successfully");
    // .header("x-auth-token", token)
    // .header("access-control-expose-headers", "x-auth-token")
    // .select("-password -createdAt -updatedAt -__v");4
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email })
    .populate("role", "roleName -_id")
    .select(" -createdAt -updatedAt -phoneNumber -__v");
  if (!user) return res.status(400).send("Invalid email or Password");

  if (user.count >= 3) {
    return res.status(400).send("This account is banned");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) return res.status(400).send("Incorrect Password");

  const token = user.generateToken(user.role.roleName);

  if (token) return res.status(200).send(token);
  else {
    return res.send("No Token Found");
  }
};

const getUserInformation = async (req, res) => {
  const { id } = req.user;

  let user = await User.findById(id)
    .populate("role", "roleName -_id")
    .select(" -createdAt -updatedAt  -password -__v");
  if (!user) return res.status(400).send("No user found");
  return res.send(user);
};
const getPendingUserInformation = async (req, res) => {
  let user = await User.find({ approved: false })
    .populate("role", "roleName -_id")
    .select(" -createdAt -updatedAt  -password -__v");
  if (!user) return res.status(400).send("No user found");
  return res.send(user);
};
const getUserById = async (req, res) => {
  const { userId } = req.params;
  let user = await User.findById(userId)
    .populate("role", "roleName -_id")
    .select(" -createdAt -updatedAt  -password -__v");

  if (user) return res.send(user);
  else return res.status(404).send("No User found");
};

const approveUser = async (req, res) => {
  const { userId } = req.params;
  let user = await User.findByIdAndUpdate(userId, { approved: true });
  if (!user) {
    return res.status(404).send("User can't be found");
  } else {
    return res.status(202).send("Successfully Approved");
  }
};

const updateUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, bank } = req.body;
  const { id } = req.user;

  const user = await User.findById(id).populate("role");
  if (!user)
    return res
      .status(400)
      .send("User is already registered,Try again with another phone number!!");
  else {
    const updateUsers = {
      firstName: firstName ? firstName : user.firstName,
      lastName: lastName ? lastName : user.lastName,
      phoneNumber: phoneNumber ? phoneNumber : user.phoneNumber,
      email: email ? email : user.email,
      bank: bank ? bank : user.bank,
    };

    const updateUser = await User.findByIdAndUpdate(id, updateUsers, {
      new: true,
    });

    if (!updateUser)
      return res.status(401).send("User information not updated");
    const token = await updateUser.generateToken(user.role.roleName);
    if (token) {
      res.json({
        msg: "User information updated successfully",
        data: updateUser,
        token,
      });
    }
  }
};

module.exports = {
  registerUser,
  authUser,
  getUserInformation,
  updateUser,
  getPendingUserInformation,
  getUserById,
  approveUser,
};
