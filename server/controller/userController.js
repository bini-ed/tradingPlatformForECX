const { validate, User } = require("../model/userModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role, phoneNumber } = req.body;

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email });
  if (user)
    return res
      .status(400)
      .send("User is already registered,Try again with another phone number!!");
  else {
    user = new User({
      firstName,
      lastName,
      phoneNumber,
      role,
      email,
      password,
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
    .select(" -createdAt -updatedAt -phoneNumber -password -__v");
  if (!user) return res.status(400).send("No user found");
  return res.send(user);
};

module.exports = { registerUser, authUser, getUserInformation };
