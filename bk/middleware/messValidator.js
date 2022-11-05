// todo
const { check, validationResult } = require("express-validator");
const { gl, yl, rl } = require("./logger");

// todo
exports.messValidator = [
  check("username")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Username:  դաշտը դատարկ է:")
    .trim()
    .escape()
    .isLength({
      min: 6,
      max: 20,
    })
    .withMessage("Username: պետք է ունենա 6-20 սիմվոլ:"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("E-mail։ դաշտը դատարկ է:")
    .isEmail()
    .withMessage("E-mail։ Նամակի ֆորմատ չէ:"),
  check("subject")
    .exists()
    .withMessage("Subject  is undefined")
    .not()
    .isEmpty()
    .withMessage(" Subject։  դաշտը դատարկ է:")
    .trim()
    .escape()
    .isLength({
      max: 64,
    })
    .withMessage("Subject։ դաշտը չպետք է ունենա 64 կամ ավել սիմվոլ։"),
  check("message")
    .exists()
    .not()
    .isEmpty()
    .withMessage(" Message։  դաշտը դատարկ է։")
    .isLength({
      max: 256,
    })
    .withMessage(" Message։ դաշտը չպետք է ունենա 256 կամ ավել սիմվոլ։"),
];

// todo
exports.messValidationResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    rl.log(errors.array()[0].msg);
    return res.status(422).json(errors.array()[0].msg);
  } else {
    gl.log("Ok, successfuly passed the validation");
  }

  // ?
  next();
};
