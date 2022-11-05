// todo
var router = require("express").Router();
var storeRouter = require("./storeRouter");
var messRouter = require("./messRouter");
var userDashRouter = require("./userDashRouter");
var orderDashRouter = require("./orderDashRouter");
var { fileUp } = require("../controllers/adminStore");

// todo
router.use("/store", storeRouter);

// todo
router.use("/messages", messRouter);

// todo
router.use("/upload", fileUp);

// todo
router.use("/users", userDashRouter);

// todo
router.use("/orders", orderDashRouter);

// todo
module.exports = router;
