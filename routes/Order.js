const express = require("express");
const router = express.Router();
const order_schema = require("../models/Order_Schema");
// get order
router.get("/", async (req, res) => {
  //   res.json({ message: "Getting Orders API" });
  try {
    const order = await order_schema.find();
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in getting order", status: "error" });
  }
});
// get order by slug
router.get("/:slug", async (req, res) => {
  //   res.json({ message: "Getting Orders API" });
  try {
    const order = await order_schema.find({ order_slug: req.params.slug });
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in getting order", status: "error" });
  }
});

// route to post order
router.post("/", async (req, res) => {
  //   res.json({ message: "Posting Orders API" });
  console.log(req.body);
  try {
    const order = new order_schema({
      order_id: req.body.order_id,
      order_by: req.body.order_by,
      date: req.body.date,
      status: req.body.status,
      phone_number: req.body.phone_number,
      email: req.body.email,
      payment_Status: req.body.payment_Status,
      product_slug: req.body.product_slug,
      product_price: req.body.product_price,
      city: req.body.city,
      country: req.body.country,
      order_status: req.body.order_status,
    });
    const newOrder = await order.save();
    res.json(newOrder);
    res.status(201).json({ message: "order posted", status: "success" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "error in posting order", status: "error" });
  }
});

module.exports = router;
