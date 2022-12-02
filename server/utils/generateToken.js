const jwt = require("jsonwebtoken");

const generateToken = (id, firstName, role) => {
  return jwt.sign({ id, firstName, role }, process.env.JWT_SECRET);
};

module.exports = generateToken;
