// todo
const { check, validationResult } = require("express-validator");
const { gl, rl } = require("./logger");

// todo
exports.loginValidator = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email: 00A0 դաշտը դատարկ է")
    .isEmail()
    //.normalizeEmail()
    .withMessage("Email:  \u00A0 Նամակի ֆորմատ չէ"),
  check("password")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Password:  \u00A0 դաշտը դատարկ է")
    .trim()
    .escape()
    .isLength({
      min: 6,
      max: 20,
    })
    .withMessage("Password:  \u00A0 պետք է ունենա 6-20 սիմվոլ"),
];

// todo
exports.loginValidationResult = (req, res, next) => {
  // ?
  const result = validationResult(req).array()[0];

  // ?
  if (result) {
    return res.status(422).json(result.msg);
  } else {
    gl.log(" Ok, successfully passed the validation");
  }

  // ?
  next();
};
