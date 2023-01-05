const express = require("express");
const router = express.Router();
const User_Schema = require("../models/UserSignup");
require("dotenv").config();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookiParser = require("cookie-parser");

router.use(cookiParser());

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User_Schema.findOne({ email }).lean();
    if (!user)
      return res
        .status(400)
        .json({ message: "email is wrong ", status: "warning" });

    const hash_psw = user.password;

    if (!bcryptjs.compareSync(password, hash_psw))
      return res
        .status(400)
        .json({ message: "  passord is wrong ", status: "warning" });

    // token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    // cookies
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: "none",
      secure: true,
    });

    // set localstorage
    res.locals.user = {
      id: user._id,
      email: user.email,
      Headers: {
        token: token,
      },
    };

    res.status(200).json({
      message: "login success",
      status: "success",
      token: token,
      user: res.locals.user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

// check user is login or not
router.get("/check_have_token", (req, res) => {
  try {
    let token = req.cookies.token || req.headers.token;
    // console.log(token);
    const have_valid_token = jwt.verify(token, process.env.JWT_SECRET);

    // get user if from token
    const id_from_token = have_valid_token.id;

    // check same id have database
    const user_id = User_Schema.findById(id_from_token);
    if (user_id == undefined) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (error) {
    res.json(false);
  }
});

// check valid token
router.get("/check_valid_token", (req, res) => {
  try {
    let token = req.cookies.token || req.headers.token;

    // console.log(token);
    const have_valid_token = jwt.verify(token, process.env.JWT_SECRET);
    res.json(true);
  } catch (error) {
    res.json(false);
  }
});

// check token id is same with user id
router.get("/checkLogin", (req, res) => {
  try {
    let token = req.cookies.token || req.headers.token;

    const have_valid_token = jwt.verify(token, process.env.JWT_SECRET);
    // get user id from token
    const id_from_token = have_valid_token.id;

    // check same id have same database
    const user_id = User_Schema.findById(id_from_token);
    if (user_id == undefined) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (error) {
    res.json(false);
  }
});

module.exports = router;
