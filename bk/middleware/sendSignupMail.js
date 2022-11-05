// todo
const nodemailer = require("nodemailer");
const { f_str, yl } = require("./logger");

// todo
module.exports = (req, res) => {
  // ?
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dimord2015@gmail.com", // this should be YOUR GMAIL account
      pass: "lbfwgxmspkymcndx", // this should be your password
    },
  });

  // ?
  let htmlBody = `<h4>Activation link</h4> <p><a href="${
    req.protocol
  }://${req.get("host")}${req.baseUrl}/${
    res.locals.uid
  }">Click on for activeting your account</a></p>`;

  // ?
  let mailOptions = {
    from: '"e-Shop" <dimord2015@gmail.com>',
    to: req.body.email,
    subject: "Account activating",
    html: htmlBody,
  };

  // ?
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return yl.log(err.message);
    }
    yl.log(f_str(`message sent: ${info.response}`));
  });
};
