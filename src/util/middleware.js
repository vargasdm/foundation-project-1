require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized Access" });
    return;
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Forbidden Access" });
      return;
    }
    req.user = user;
    next();
  });
}

function authenticateManagerToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized Access" });
    return;
  }

  jwt.verify(token, secretKey, (err) => {
    if (err || jwt.decode(token).role !== "manager") {
      res.status(403).json({ message: "Forbidden Access" });
      return;
    }
    next();
  });
}

module.exports = {
  authenticateToken,
  authenticateManagerToken,
};
