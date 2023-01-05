require("dotenv").config();
const mongoose = require("mongoose");

// Product_Category_schema
const product_category_schema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },

  category_description: {
    type: String,
    required: true,
  },
  category_slug: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("product_categories", product_category_schema);
