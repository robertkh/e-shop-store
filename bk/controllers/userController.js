// todo
const User = require("../models/userModel");
const _ = require("lodash");
const bcrypt = require("bcrypt");
var moment = require("moment");
var jwt = require("jsonwebtoken");
const { rl } = require("../middleware/logger");

// todo
exports.postUserSignup = async (req, res, next) => {
  try {
    // ?
    let user = await User.findOne({
      email: req.body.email,
    });

    // ?
    if (user) {
      return res
        .status(400)
        .jsonp("Message from server: That user already exisits!");
    }

    user = new User(_.pick(req.body, ["username", "email", "password"]));

    // ?
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.locals.uid = user._id;

    res.json(
      "Դուք հաջողությամբ գրանցվեցիք ։  Նախքան Ձեր հաշիվ մուտք գործելն  անհրաժեշտ է ակտիվացնել այն՝ տես E-mail։"
    );

    // ?
    next();
  } catch (err) {
    rl.log(err.message);
  }
};

// todo
exports.getUserActive = async (req, res) => {
  try {
    // ?
    let user = await User.findOne({
      _id: req.params.id,
    });

    // ?
    if (!user) {
      return res.status(400).json("No such user.");
    }

    user.isReged = true;

    // ?
    await user.save();

    // ?
    res.end("You successfully activated your account");
  } catch (err) {
    rl.log(err.message);
  }
};

// todo
exports.postUserLogin = async (req, res) => {
  try {
    // ?
    let user = await User.findOne({
      email: req.body.email,
    });

    //* gl.log(user._id.getTimestamp()); //hetaqrqir er
    if (!user) {
      return res
        .status(400)
        .json(
          "Email: \u00A0 Տվյալ էլեկտրոնային հասցեով օգտատեր գոյություն չունի։"
        );
    }

    // ?
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // ?
    if (!validPassword) {
      return res.status(400).json("Password: \u00A0 ծածկագիրը սխալ է");
    }

    // ?
    if (!user.isReged) {
      return res
        .status(500)
        .json("Ձեր հաշիվը ակտիվ չէ։ Ստուգեք ձեր էլեկտրոնային հասցեն։ ");
    }

    // ?
    if (!req.session.activeUser) {
      req.session.activeUser = {
        name: user.username,
        id: user.id,
        firstVisit: moment().toString(),
        visitNumber: 1,
      };
    } else {
      req.session.activeUser.name = user.username;
      req.session.activeUser.id = user.id;
      req.session.activeUser.visitNumber =
        req.session.activeUser.visitNumber + 1;
    }

    // ?
    res.cookie("activeu", user.username, {
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });

    // ?
    res.cookie("activeid", user.id, {
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });

    // ?
    if (user.isAdmin) {
      const token = user.generateAuthToken();

      res.cookie("access_token", "Bearer " + token, {
        expires: new Date(Date.now() + 14 * 24 * 3600000), // 14 days
        httpOnly: true,
      });
      res.cookie("checkfild", user.id, {
        expires: new Date(Date.now() + 14 * 24 * 3600000), // 14 days
      });
    }

    // ?
    res.json("Հաջողությամբ մուտք գործեցիք ձեր հաշիվ։");
  } catch (err) {
    rl.log(err.message);
  }
};

// todo
exports.getUsersLogout = async (req, res) => {
  try {
    if (req.cookies.activeid === req.cookies.checkfild) {
      res.clearCookie("checkfild");
    }

    if (req.session.activeUser) {
      req.session.activeUser.name = "";
      req.session.activeUser.id = "";
    }

    res.cookie("activeu", "guest");
    res.cookie("activeid", "");

    res.json("Հաջողությամբ ավարտեցիք սեանսը։");
  } catch (err) {
    rl.log(err.message);
  }
};

// todo
exports.getNewPassword = async (req, res, next) => {
  try {
    // ?
    let user = await User.findOne({
      email: req.body.email,
    });

    // ?
    if (!user) {
      return res.status(400).json("Էլեկտրոնային հասցեն սխալ է։");
    }

    // ?
    res.locals.jwt = jwt.sign(
      {
        em: req.body.email,
        ps: req.body.password,
      },
      process.env.PRIVATE_KEY,
      {
        expiresIn: "1h",
      }
    );

    // ?
    next();
  } catch (err) {
    rl.log(err.message);
  }
};

// todo
exports.setNewPassword = async (req, res) => {
  try {
    // ?
    const jwtToken = req.params.id;
    const decoded = jwt.verify(jwtToken, process.env.PRIVATE_KEY);

    // ?
    let user = await User.findOne({
      email: decoded.em,
    });
    if (!user) {
      return res
        .status(400)
        .json("Նման Էլեկտրոնային հասցեով օգտատեր գոյություն չունի։");
    }

    // ?
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(decoded.ps, salt);
    user.password = password;
    await user.save();

    // ?
    res.send("Ձեր ծածկագիրը հաջողությամբ փոփվեց։");
  } catch (err) {
    res.send("Ձեզ տրված ժամանակը սպառվել է։ Նորից փորձեք։");
    rl.log(err.message);
  }
};

// todo
exports.passCheckAuth = (req, res) => {
  rl.log("check-auth invoked");
  res.send("Welcome Admin");
};
