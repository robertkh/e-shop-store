// todo
const { check, validationResult } = require("express-validator");

// todo
exports.resetValidator = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email: դաշտը դատարկ է")
    .isEmail()
    .withMessage("Email : նամակի ֆորմատ չէ"),
  check("password")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Password: դաշտը դատարկ է")
    .trim()
    .escape()
    .isLength({
      min: 6,
      max: 20,
    })
    .withMessage("Password: պետք է ունենա 6-20 սիմվոլ"),
];

// todo
exports.resetValidationResult = (req, res, next) => {
  // ?
  const result = validationResult(req).array()[0];
  if (result) {
    return res.status(422).jsonp(result.msg);
  }

  // ?
  next();
};
