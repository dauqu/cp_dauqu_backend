const express = require("express");
const router = express.Router();
const User_Schema = require("../models/UserSignup");
const bcryptjs = require("bcryptjs");
const UserSignup = require("../models/UserSignup");
const upload = require("../config/image_upload");

// get user
router.get("/", async (req, res) => {
  // res.json({ message: "Getting signup API" })
  try {
    const user = await User_Schema.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "error in getting user", status: "error" });
  }
});

// code to count all users
router.get("/count/alluser", async (req, res) => {
  try {
    const user = await User_Schema.find();
    res.json(user.length);
  } catch (error) {
    res.status(500).json({ message: "error in getting user", status: "error" });
  }
});

//  getting user by id from database
router.get("/:id", async (req, res) => {
  try {
    const user = await User_Schema.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "error in getting user", status: "error" });
  }
});

// route to get user by unique key
router.get("/uniquekey/:uniqueKey", async (req, res) => {
  try {
    const user = await User_Schema.findOne({ uniqueKey: req.params.uniqueKey });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "error in getting user", status: "error" });
  }
});

//  update user by id from database
router.patch("/update/user/:id", async (req, res) => {
  try {
    const user = await User_Schema.findById(req.params.id);
    if (req.body.name != null) {
      user.name = req.body.name;
    }
    if (req.body.username != null) {
      user.username = req.body.username;
    }
    if (req.body.phone != null) {
      user.phone = req.body.phone;
    }
    if (req.body.address != null) {
      user.address = req.body.address;
    }

    if (req.body.email != null) {
      user.email = req.body.email;
    }

    if (req.body.country != null) {
      user.country = req.body.country;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in updating user", status: "error" });
  }
});

// create user
router.post(
  "/",
  upload.single("picture"),
  SignupValidation,
  async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    // console.log(req.body);
    // code for random number generation for unique key
    var randomString = function (length) {
      var text = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < length; i++)
        text += possible
          .charAt(Math.floor(Math.random() * possible.length))
          .toUpperCase();

      return text;
    };
    console.log(randomString(15));
    // hashing password
    const salt = await bcryptjs.genSalt();
    const hashed_password = await bcryptjs.hash(req.body.password, salt);

    const user = new User_Schema({
      name: req.body.name,
      username: req.body.username,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
      password: hashed_password,
      country: req.body.country,
      // code to genereate unique key for user for 8 digit
      uniqueKey: randomString(15),
      image: url + "/medias/" + req.file.filename,
    });
    console.log(req.body);
    try {
      const newUser = await user.save();
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message, status: "error" });
    }
  }
);

// code to confirm old password with new password in node js and update hashed password in database using bcryptjs
router.patch("/update/password/:id", async (req, res) => {
  try {
    const user = await User_Schema.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "user not found" });
    }
    // check if old password is correct
    const isMatch = await bcryptjs.compare(
      req.body.old_password,

      user.password
    );
    if (!isMatch) {
      return res.status(400).json({ message: "old password is incorrect" });
    }
    // code to match new password and confirm password
    if (req.body.new_password != req.body.confirm_password) {
      return res.status(400).json({ message: "password not matched" });
    }

    // code to hash a new password
    const salt = await bcryptjs.genSalt();
    const hashed_password = await bcryptjs.hash(req.body.new_password, salt);
    user.password = hashed_password;
    console.log(user.password);
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      message: "Error in posting ",
      status: "error",
    });
  }
});

//  code to delete user by getting user id from database
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User_Schema.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "user not found" });
    }
    await user.remove();
    res.json({ message: "user deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

// middleware for register user validation
async function SignupValidation(req, res, next) {
  // check if user exist
  const user = await User_Schema.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .json({ message: "User already exists", status: "error" });

  // check email is valid
  const email = req.body.email;
  const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email_regex.test(email))
    return res
      .status(400)
      .json({ message: "Email is not valid ", status: "error" });

  //Check username is valid
  const username = req.body.username;
  const username_regex = /^[a-zA-Z0-9]{3,20}$/;
  if (!username_regex.test(username))
    return res.status(400).json({
      message: "Username is not valid",
      status: "error",
    });

  // check password is not null
  if (req.body.password == null)
    return res
      .status(400)
      .json({ message: "Password is required", status: "error" });

  next();
}

module.exports = router;
