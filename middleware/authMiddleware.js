const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_super_secret_key";

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return res.status(401).json("No token, authorization denied");

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified; // Attach user info to request
    next();
  } catch (err) {
    res.status(400).json("Token is not valid");
  }
};
