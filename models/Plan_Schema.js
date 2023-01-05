const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  plan_name: {
    type: String,
    required: true,
  },
  billing_cycle: {
    type: String,
    required: true,
  },
  plan_title: {
    type: String,
    required: true,
  },
  plan_description: {
    type: String,
    required: true,
  },
  plan_price: {
    type: Number,
    required: true,
  },
  plan_slug: {
    type: String,
    required: true,
  },
  plan_info_one: {
    type: String,
    required: true,
  },
  plan_info_two: {
    type: String,
    required: true,
  },
  plan_info_three: {
    type: String,
    required: true,
  },
  plan_info_four: {
    type: String,
    required: true,
  },
  plan_transaction_fee: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("plans", PlanSchema);