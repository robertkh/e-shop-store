// todo
var express = require("express");
var router = express.Router();
const Order = require("../models/orderModel");
const { yl, rl } = require("../middleware/logger");

// todo
router.post("/paypal", async (req, res) => {
  yl.log(req.body.invoiceData);
  try {
    // ?
    let order = await Order.findOne({
      _id: req.body.invoiceData._id,
    });
    order.paid = true;
    await order.save();

    res.json("Վճարումը ավարտվեց հաջողողությամբ։");
  } catch (err) {
    rl.log(err.message);
  }
});

// todo
module.exports = router;
