// todo
const jwt = require("jsonwebtoken");
const { f_str, yl } = require("./logger");

// todo
module.exports = function (req, res, next) {
  if (!req.cookies.access_token || !req.session.activeUser.id) {
    return res.status(401).json("Ներողություն, մուտքը կայք ձեզ արտոնված չէ։");
  }

  // ?
  const token = req.cookies.access_token.split(" ")[1];

  // ?
  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    if (req.cookies.activeid !== req.session.activeUser.id) {
      yl.log(f_str("Շատ վատ բան ա տեղի ունեցել։"));
    }

    if (decoded._id === req.session.activeUser.id) {
      next();
    } else {
      res.json("Access denied. You are not Admin");
    }
  } catch (err) {
    yl.log(f_str("Invalid JWT."));
    res.status(400).json("Invalid JWT.");
  }
};
