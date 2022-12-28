const jwt = require("jsonwebtoken");

async function adminMiddleware(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("You need to login to access this page");
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (decode.role != "admin" && decode.role != "warehouse")
      return res.status(400).send("Only admin can access this route");
    req.user = decode;
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
}
async function wareHouserMiddleware(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("You need to login to access this page");
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (decode.role != "warehouse")
      return res
        .status(400)
        .send("Only warehouse officer can access this route");
    req.user = decode;
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
}

module.exports = { wareHouserMiddleware, adminMiddleware };
