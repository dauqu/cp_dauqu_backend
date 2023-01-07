const express = require("express");
const router = express.Router();
const plan_schema = require("../models/Plan_Schema");
// get plan
router.get("/", async (req, res) => {
  //   res.json({ message: "Getting Plans API" });
  try {
    const plan = await plan_schema.find();
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: "error in getting plan", status: "error" });
  }
});

// get plan by slug
router.get("/:slug", async (req, res) => {
  //   res.json({ message: "Getting Plans API" });
  try {
    const plan = await plan_schema.find({ plan_slug: req.params.slug });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: "error in getting plan", status: "error" });
  }
});

//  route for update plan duration bu getting slug
router.put("/update/duration/:slug", async (req, res) => {
  //   res.json({ message: "Getting Plans API" });
  try {
    const plan = await plan_schema.findOneAndUpdate(
      { plan_slug: req.params.slug },

      {
        $set: {
          plan_duration: req.body.plan_duration,
          plan_price: req.body.plan_price,
          plan_info_one: req.body.plan_info_one,
          plan_info_two: req.body.plan_info_two,
          plan_info_three: req.body.plan_info_three,
          plan_info_four: req.body.plan_info_four,
          
        },
      },
      { new: true }
    );
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: "error in getting plan", status: "error" });
  }
});

// route to post plan
router.post("/", async (req, res) => {
  // code for slug
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
  console.log(randomString(5));

  //   res.json({ message: "Getting Plans API" });
  const plan = new plan_schema({
    plan_name: req.body.plan_name,
    billing_cycle: req.body.billing_cycle,
    plan_title: req.body.plan_title,
    plan_description: req.body.plan_description,
    plan_price: req.body.plan_price,
    plan_slug: randomString(5),
    plan_info_one: req.body.plan_info_one,
    plan_info_two: req.body.plan_info_two,
    plan_info_three: req.body.plan_info_three,
    plan_info_four: req.body.plan_info_four,
    plan_transaction_fee: req.body.plan_transaction_fee,
  });

  try {
    const newPlan = await plan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});
module.exports = router;
