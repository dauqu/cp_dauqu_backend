const mongoose = require("mongoose");

// order_Schema
const Order_Schema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    order_by: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    status: {
      type: String,
    },
    phone_number: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    payment_Status: {
      type: String,
    },

     
    product_slug: {
      type: String,
    },

    product_price: {
      type: Number,
    },

    city: {
      type: String,
    },

    country: {
      type: String,
    },
    order_status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", Order_Schema);
