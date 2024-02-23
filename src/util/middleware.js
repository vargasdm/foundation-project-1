require('dotenv').config()
const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

function validateResponseCredentials(receivedData) {
  if (!receivedData.username || !receivedData.password) {
    return false;
  }
  return true;
}

function validateTicketCredentials(receivedData) {
  if (!receivedData.user || !receivedData.description || !receivedData.amount) {
    return false;
  }
  return true;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);

  console.log(secretKey);

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

function authenticateAdminToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized Access" });
    return;
  }

  jwt.verify(token, secretKey, (err, user) => {
    console.log(user.role);
    if (err || user.role !== "admin") {
      res.status(403).json({ message: "Forbidden Access" });
      return;
    }
    req.user = user;
    next();
  });
}

module.exports = {
  validateResponseCredentials,
  validateTicketCredentials,
  authenticateToken,
  authenticateAdminToken,
};
