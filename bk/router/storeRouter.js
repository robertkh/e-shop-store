//  todo
// ?
var express = require("express");
var router = express.Router();
// ?
var Item = require("../models/itemModel");
// ?
const { yl, f_str } = require("../middleware/logger");
// ?
const { addAndUpdate, delItem } = require("../controllers/adminStore");
// ?
const {
  storeValidator,
  storeValidationResult,
} = require("../middleware/storeValidator");

// todo - get store
router.post("/", async (req, res) => {
  // ?
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
});

//  todo - add store
router.post("/add", storeValidator, storeValidationResult, addAndUpdate);

//  todo - update store
router.post(
  "/update",

  addAndUpdate
);

//  todo - del store
router.post("/del", delItem);

//  todo
module.exports = router;
