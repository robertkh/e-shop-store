// todo
var router = require("express").Router();
var {
  shopInfo,
  postMessSend,
  myOrder,
  details,
} = require("../controllers/homeController");

const {
  messValidator,
  messValidationResult,
} = require("../middleware/messValidator");

// todo
router.post("/shop", shopInfo);

// todo
router.post("/orders", myOrder);

// todo
router.post("/invoice/:id", details);

// todo
router.post("/contact", messValidator, messValidationResult, postMessSend);

// todo
module.exports = router;
