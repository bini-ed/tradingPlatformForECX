const jwt = require("jsonwebtoken");

async function protectUrl(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).send("You need to login to access this page");
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}

module.exports = protectUrl;
