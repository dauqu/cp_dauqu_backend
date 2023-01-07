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
    userUniqueKey: {
      type: String,
      required: true,
    },
    order_status: {
      type: String,
    },
    plan_start_date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    plan_expiry_date: {
      type: Date,
    },
    plan_duration: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", Order_Schema);
