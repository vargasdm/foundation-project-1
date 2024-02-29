const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userService = require("../service/userService");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

// register user endpoint
router.post("/register", async (req, res) => {
  let data = await userService.postUser(req.body);
  if (data) {
    res.status(201).json({ message: "User registered successfully" });
  } else {
    res.status(400).json({
      message:
        "User could not be registered, please check your credentials and try again",
    });
  }
});

// login user endpoint
router.post("/login", async (req, res) => {
  let data = await userService.loginUser(req.body);

  if (data) {
    const token = jwt.sign(
      {
        // token payload
        username: data.Items[0].username,
        role: data.Items[0].role,
      },
      secretKey,
      {
        expiresIn: "5h",
      }
    );

    res.status(200).json({ message: "User logged in successfully", token });
  } else {
    res.status(400).json({
      message:
        "User could not be logged in, please check your credentials and try again",
    });
  }
});

module.exports = router;
