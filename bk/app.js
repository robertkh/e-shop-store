// todo
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const checkAuth = require("./middleware/checkAuth");
const { f_str, yl, rl, gl } = require("./middleware/logger");
const Item = require("./models/itemModel");
var _ = require("lodash");

// todo
var adminRouter = require("./router/adminRouter");
var homeRouter = require("./router/homeRouter");
var usersRouter = require("./router/userRouter");
var payRouter = require("./router/payRouter");

// todo
var app = express();

// todo
const favicon = require("serve-favicon");
app.use(
  favicon(path.join(__dirname, "../client/public", "images", "favicon.ico"))
);

// todo
const session = require("./middleware/session");
app.use(session);

// todo
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", usersRouter);

// todo
app.use("/", homeRouter);

// todo
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("/*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../client/build", "index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
} else {
  app.use(express.static(path.join(__dirname, "../client/public")));
}

// todo
app.use("/checkout", async (req, res) => {
  let cartArr = req.body.cartContent;

  for (let i = 0; i < cartArr.length; i++) {
    try {
      let item = await Item.findOne({
        itemName: cartArr[i].name,
      });

      if (item) {
        if (+item.itemQty < +cartArr[i].qty) {
          res
            .status(500)
            .json(
              `${item.itemName.replace("_", " ")} - պահեստում մնացել է ${
                item.itemQty
              } հատ։`
            );
          return;
        }
      } else {
        //* anhavanakan depqn a sa.
        res.status(500).json(`${cartArr[i].name} անունով ապրանք բազայում չկա։`);
        return;
      }
    } catch (err) {
      rl.log("catch err --->>>", err.message);
    }
  }

  res.json("Այժմ մուտքագրեք առաքման հասցեն։");
});

// todo
app.use("/pay", payRouter);

// todo
const Order = require("./models/orderModel");
app.use("/confirm", async (req, res) => {
  let item = await Item.findOne({
    itemName: req.body.cartContent[0].name,
  });
  item.itemQty -= req.body.cartContent[0].qty;
  await item.save();

  // ?
  let order = new Order(req.body);
  await order.save();
  res.json("Պատվերի հաստատումը կատարված է։");
});

// todo
app.use(fileUpload());

// todo
app.use("/admin", checkAuth, adminRouter);

// todo
module.exports = app;
