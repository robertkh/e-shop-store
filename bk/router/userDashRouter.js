// todo - mouted on '/admin/messages'
var router = require("express").Router();

// ?
var {
  usersList,
  usersDel,
  usersStatus,
} = require("../controllers/userDashController");

// todo
router.post("/", usersList);

// todo
router.post("/del", usersDel);

// todo
router.post("/status", usersStatus);

// todo
module.exports = router;
