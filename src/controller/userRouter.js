// endpoint: /users
// CRUD
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userService = require("../service/userService");

router.post("/register", async (req, res) => {
  let data = await userService.postUser(req.body);

  if (data) {
    res.status(201).json({ message: "User registered successfully", data });
  } else {
    res.status(400).json({
      message: "User could not be registered, please check your credentials and try again",
      receivedData: data,
    });
    // }
  }
});

module.exports = router;
