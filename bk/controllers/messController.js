// todo
const Message = require("../models/messModel");
var moment = require("moment");
moment().format("LL");

// todo
exports.delMessage = async (req, res) => {
  let mess = await Message.findByIdAndRemove(req.body.messId.trim());
  res.json("ok");
};

// todo
exports.readMessage = async (req, res) => {
  moment.locale("hy-am");
  let messages = await Message.find();

  for (var i = 0; i < messages.length; i++) {
    let title =
      messages[i].username +
      " - ( " +
      moment(messages[i].created).format("LLL") +
      " )";
    messages[i].username = title;
  }
  res.json(messages);
};
