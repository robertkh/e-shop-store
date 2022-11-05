// todo
const Order = require("../models/orderModel");
const { rl } = require("../middleware/logger");

// todo
exports.ordersList = async (req, res, next) => {
  try {
    const usersProjection = {
      __v: false,
      payMethod: false,
      address: false,
    };
    let orderList = await Order.find({}, usersProjection);

    if (orderList) {
      res.json(orderList);
    } else {
      res.json("տեղի ունեցավ վատ բան սերվերում");
    }
  } catch (err) {
    rl.log(err.message);
    res.status(500).json(err.message);
  }
};

// todo
exports.orderStatChange = async (req, res) => {
  try {
    let order = await Order.findOne({ _id: req.body.id });

    if (order) {
      order[req.body.field] = !order[req.body.field];
      await order.save();
      res.json("ok");
    } else {
      res.json("տեղի ունեցավ վատ բան սերվերում");
    }
  } catch (err) {
    rl.log(err.message);
    res.status(500).json(err.message);
  }
};
