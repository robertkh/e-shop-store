// todo
var express = require("express");
var router = express.Router();

// ?
var { readMessage, delMessage } = require("../controllers/messController");

// todo
router.post("/", readMessage);

// todo
router.post("/del", delMessage);

// todo
module.exports = router;
