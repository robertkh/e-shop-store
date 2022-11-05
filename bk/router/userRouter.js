// todo
var express = require("express");
var router = express.Router();

// ?
const {
  signupValidator,
  signupValidationResult,
} = require("../middleware/signupValidator");
// ?
const {
  loginValidator,
  loginValidationResult,
} = require("../middleware/loginValidator");
// ?
const {
  resetValidator,
  resetValidationResult,
} = require("../middleware/passwordResetValidator");
// ?
const {
  postUserSignup,
  getUserActive,
  postUserLogin,
  getUsersLogout,
  getNewPassword,
  setNewPassword,
} = require("../controllers/userController");
// ?
const sendSignupMail = require("../middleware/sendSignupMail");
const sendResetMail = require("../middleware/sendResetMail");

// todo
router.post(
  "/signup",

  signupValidator,

  signupValidationResult,

  postUserSignup,

  sendSignupMail
);

// todo
router.post("/login", loginValidator, loginValidationResult, postUserLogin);

// todo
router.post("/logout", getUsersLogout);

// todo
router.get("/:id", getUserActive);

// todo
router.post(
  "/reset",
  resetValidator,
  resetValidationResult,
  getNewPassword,
  sendResetMail
);

// todo
router.get("/setnewpass/:id", setNewPassword);

// todo
module.exports = router;
