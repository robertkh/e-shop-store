// todo - mouted on '/admin/messages'
var router = require("express").Router();

// ?
var {
  ordersList,
  orderStatChange,
} = require("../controllers/orderDashController");

// todo
router.post("/", ordersList);

// todo
router.post("/status", orderStatChange);

// todo
module.exports = router;
