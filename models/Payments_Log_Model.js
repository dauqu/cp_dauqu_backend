const mongoose = require("mongoose");

const paymentsLogSchema = new mongoose.Schema({
  razorpay: [
    {
      orderCreationId: {
        type: String,
      },
      razorpayPaymentId: {
        type: String,
      },
      razorpayOrderId: {
        type: String,
      },
      razorpaySignature: {
        type: String,
      },
    },
  ],
  paypal: [],
  stripe: [],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("payments_log", paymentsLogSchema);
