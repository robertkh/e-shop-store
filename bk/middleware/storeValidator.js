// todo
const { check, validationResult } = require("express-validator");
const { yl } = require("./logger");

// todo
exports.storeValidator = [
  check("itemName")
    .exists() //* Կա՞ արդյոք նման անունով դաշտ body-ում
    .bail() // * Սխալի դեպքում դաշտի ստուգումը դադարում է։
    .withMessage("Դաշտ: \u00A0 անունների անհամապատասխանություն։")
    .isString()
    .withMessage("Անուն: \u00A0 սխալ տվյալների տիպ։")
    .trim()
    .escape()
    .notEmpty()
    .bail()
    .withMessage("Անուն: \u00A0 դաշտը դատարկ է")
    .isLength({
      min: 6,
      max: 30,
    })
    .withMessage("Անուն: \u00A0 պետք է ունենա 6-20 սիմվոլ"),

  check("itemQty")
    .trim()
    .isInt({
      min: 1,
    })
    .bail()
    .withMessage(
      "Քանակ: \u00A0 պետք է պարունակի միայն 1 և ավելի մեծ ամբողջ թիվ։"
    )
    .isNumeric({
      no_symbols: true,
    })
    .withMessage(
      "Քանակ: \u00A0 չպետք է պարունակի որևէ սիմվոլ, բացի թվանշաններից։"
    ),

  check("itemPrice")
    .trim()
    .toFloat()
    .isFloat({
      min: 0,
    })
    .withMessage("Գին: \u00A0 պետք է պարունակի միայն ոչ բացասական թիվ։"),
];

// todo
exports.storeValidationResult = (req, res, next) => {
  // ?
  const errors = validationResult(req);
  yl.log(errors);

  // ?
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array()[0].msg);
  }

  // ?
  next();
};
