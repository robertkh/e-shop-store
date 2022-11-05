// todo
const nodemailer = require("nodemailer");
const { gl, rl } = require("./logger");

// todo
const transport = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "dimord2015@gmail.com",
    pass: "parnarareg",
  },
};

// todo
const transporter = nodemailer.createTransport(transport);

// todo
transporter.verify((error, success) => {
  if (error) {
    rl.log(error);
  } else {
    gl.log(" users ready to mail myself");
  }
});

// todo
module.exports = (req, res, next) => {
  const mailOptions = {
    replyTo: req.body.u_email,
    to: "robert.khnkoyan@gmail.com",
    subject: "From My WebSite",
    html: `<hr>
		<p><span style='color:blue'>Sender : </span> <b>${req.body.u_name}</b></p>
		<p><span style='color:blue'>Subject :</span>  ${req.body.u_subject}</p>
		<p><span style='color:blue'>Message : </span> ${req.body.u_message}</p>`,
  };

  transporter
    .sendMail(mailOptions)
    .then((data) => {})
    .catch((err) => {
      res.send(err);
    });
};
