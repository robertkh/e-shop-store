// todo - կարծես թե մեկ անգամ պիտի աշխատի
var moment = require("moment");

// todo
module.exports = (req, res, next) => {
  if (!req.session.first_v) {
    req.session.first_v = moment().toString();
  }
  next();
};
