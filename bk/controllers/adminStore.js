// todo
const Item = require("../models/itemModel");
const _ = require("lodash");
var Path = require("path");
const Fs = require("fs");
const { yl, rl, bl, f_str } = require("../middleware/logger");

// todo
exports.addAndUpdate = async (req, res, next) => {
  try {
    let item = await Item.findOne({
      itemName: req.body.itemName,
    });

    if (item) {
      item.itemName = req.body.itemName;
      item.itemQty = +req.body.itemQty;
      item.itemPrice = +req.body.itemPrice;
      await item.save();
      res.json("Ապրանքը հաջողությամբ վերախմբագրվեց։");
    } else {
      item = new Item(_.pick(req.body, ["itemName", "itemQty", "itemPrice"]));

      item.itemImg = item.itemName + ".jpg";
      await item.save();
      res.json("Դուք հաջողությամբ գրանցեցիք նոր ապրանք։");
    }
  } catch (err) {
    rl.log(err.message);
  }
};

// todo
exports.delItem = async (req, res, next) => {
  try {
    var doc = await Item.findOneAndDelete({
      itemName: req.body.itemName,
    });
    if (doc) {
      res.json("Ապրանքը հաջողությամբ հեռացվեց բազայից։");
    } else {
      res.json("Նշված ապրանքը բազայում չկա։");
    }
  } catch (err) {
    rl.log(err.message);
  }
};

// todo
exports.fileUp = async function (req, res) {
  // ?
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // ?
  const image = req.files.upImage;
  let filePath;
  if (process.env.NODE_ENV === "production") {
    filePath = Path.join(__dirname, "../../client/build/images/") + image.name;
    rl.log(f_str(filePath));
  } else {
    filePath = Path.join(__dirname, "../../client/public/images/") + image.name;
    rl.log(f_str(filePath));
  }

  // ?
  if (image.size > 100 * 1024) {
    rl.log("Նկարի ծավալը գերազանցում է թույլատրելի սահմանը։");
    return;
  }

  // ?
  try {
    await image.mv(`${filePath}`, (error) => {
      if (error) {
        rl.log(error);
        res.status(500).json({
          message: error,
        });
        return;
      }
      res.json("Նկարը հաջողությամբ վերբեռնվեց։");
    });
  } catch (err) {
    rl.log(f_str(err.message));
  }
};
