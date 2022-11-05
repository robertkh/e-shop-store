// todo
const { check, validationResult } = require("express-validator");
const { gl } = require("./logger");

// todo
exports.signupValidator = [
  check("username")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Username: \u00A0  դաշտը դատարկ է")
    .trim()
    .escape()
    .isLength({
      min: 6,
      max: 20,
    })
    .withMessage("Username: պետք է ունենա 6-20 սիմվոլ"),

  check("email")
    .not()
    .isEmpty()
    .withMessage("Email։ դաշտը դատարկ է")
    .isEmail()
    .withMessage("Email։ Նամակի ֆորմատ չէ"),

  check("password")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Password։ դաշտը դատարկ է")
    .trim()
    .escape()
    .isLength({
      min: 6,
      max: 20,
    })
    .withMessage("Password։ պետք է ունենա 6-20 սիմվոլ"),

  check("conf_password", "Confirm Password ։ ծածկագրերը չեն համընկնում։")
    .exists()
    .custom((value, { req }) => value === req.body.password),
];

// todo
exports.signupValidationResult = (req, res, next) => {
  // ? -  https://express-validator.github.io/docs/validation-result-api.html
  const result = validationResult(req).array()[0];

  // ?
  if (result) {
    return res.status(422).json(result.msg);
  }

  // ?
  gl.log(" Ok, successfully passed the validation");

  // ?
  next();
};
