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

// route to get order by id
router.get("/:id", async (req, res) => {
  //   res.json({ message: "Getting Orders API" });
  try {
    const order = await order_schema.findById(req.params.id);
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

// route get order by userUniqueKey
router.get("/userUniqueKey/:userUniqueKey", async (req, res) => {
  try {
    const order = await order_schema.find({
      userUniqueKey: req.params.userUniqueKey,
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "error in getting order by userUniqueKey",
      status: "error",
    });
  }
});

// route to post order
router.post("/", async (req, res) => {
  //   res.json({ message: "Posting Orders API" });
  let month = req.body?.months;

  const currDate = Date.now();
  const tomili = month * 28 * 24 * 60 * 60 * 1000;

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
      userUniqueKey: req.body.userUniqueKey,
      plan_expiry_date: currDate + tomili,
    });
    const newOrder = await order.save();
    res
      .status(201)
      .json({ message: "order posted", status: "success", newOrder });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "error in posting order", status: "error" });
  }
});

// code to delete order by id
router.delete("/:id", async (req, res) => {
  try {
    const order = await order_schema.findByIdAndDelete(req.params.id);
    res.json({ message: "order deleted", status: "success", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in deleting order", status: "error" });
  }
});

module.exports = router;
