require("dotenv").config();
const mongoose = require("mongoose");

// schema
const user_sehema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    reqired: true,
  },
  country: {
    type: String,
  },
  address: {
    type: String,
    reqired: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    reqired: true,
  },
  image: {
    type: String,
  },
  uniqueKey: {
    type: String,
    // reqired: true,
  },
});

module.exports = mongoose.model("users", user_sehema);
