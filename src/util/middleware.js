require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
let ticketQueue = require("../service/ticketService");

function validateResponseCredentials(receivedData) {
  if (!receivedData.username || !receivedData.password) {
    return false;
  }
  return true;
}

function validateTicketData(receivedData) {
  if (!receivedData.user || !receivedData.description || !receivedData.amount) {
    return false;
  }
  return true;
}

function validateProcessData(receivedData) {
  if (!receivedData.ticket_id || !receivedData.role || !receivedData.status) {
    return false;
  }
  return true;
}

function validateTicketQueue(receivedData, ticketQueueArr) {
  if (receivedData.ticket_id == ticketQueueArr[0]) {
    return true;
  }
  return false;
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

function authenticateManagerToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // console.log(req.query.role);

  if (!token) {
    res.status(401).json({ message: "Unauthorized Access" });
    return;
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err || req.query.role !== "manager") {
      res.status(403).json({ message: "Forbidden Access" });
      return;
    }
    next();
  });
}

module.exports = {
  validateResponseCredentials,
  validateTicketData,
  validateProcessData,
  validateTicketQueue,
  authenticateToken,
  authenticateManagerToken,
};
