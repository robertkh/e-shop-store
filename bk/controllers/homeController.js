// todo
const Item = require("../models/itemModel");
const Order = require("../models/orderModel");
const { yl, rl, gl, f_str } = require("../middleware/logger");
var _ = require("lodash");

// todo
function currToNum(str) {
  return +str.replace(",", "").replace(" ֏", "");
}
// ?
function numToCurr(n) {
  return new Intl.NumberFormat("hy-AM").format(n) + " \u058F";
}

//todo
exports.shopInfo = async (req, res) => {
  let shopItems = {};

  if (req.body.pageLim) {
    shopItems = await Item.paginate(
      {},
      {
        page: req.body.pageNum,
        limit: req.body.pageLim,
      }
    );
  } else {
    shopItems = await Item.paginate(
      {},
      {
        pagination: false,
      }
    );
  }

  res.json(shopItems);
};

// todo
const Message = require("../models/messModel");
//
exports.postMessSend = async (req, res) => {
  let message = new Message(req.body);
  await message.save();
  res.json("Հաղորդագրությունը հաջողությամբ ուղարկվեց։");
};

//
exports.myOrder = async (req, res) => {
  try {
    const usersProjection = {
      __v: false,
      payMethod: false,
      address: false,
      user: false,
    };
    let orderList = await Order.find(
      {
        user: { username: req.body.name },
      },
      usersProjection
    );

    let data = orderList.map((el) => {
      let rest = _.pick(el, ["_id", "paid", "shipped", "created"]);

      let total = el.cartContent.reduce((sum, val) => {
        return sum + val.qty * currToNum(val.price);
      }, 0);

      return {
        ...rest,
        total: total,
      };
    });

    if (orderList) {
      res.json(data);
    } else {
      res.json("տեղի ունեցավ վատ բան սերվերում");
    }
  } catch (err) {
    rl.log(err.message);
    res.status(500).json(err.message);
  }
};

//
exports.details = async (req, res) => {
  //
  let order = await Order.findOne({
    _id: req.params.id,
  });
  res.json(order);
};
