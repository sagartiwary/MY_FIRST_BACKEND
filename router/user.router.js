const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const key = process.env.KEY;
// registration here we need to perform hashing to convert the password into hashing
// format

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      res.status(200).json({ msg: "User already exits" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(400).json({ error: err.message });
        } else {
          let newUser = new UserModel({ name, email, password: hash });
          await newUser.save();
          res.status(200).json({ msg: "new user has been added" });
        }
      });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user._id, user: user.name }, key);
          res.status(200).json({ msg: "Token authorized", token });
        } else {
          res.status(400).json({ msg:"User Not Found!!" });
        }
      });
    } else {
      res.status(400).json({ msg: "Please login" });
    }
  } catch (error) {
    res.status(400).json({ message:"User Not found!!!" });
  }
});

module.exports = {
  userRouter,
};
