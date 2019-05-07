const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "92c69a5c93539a",
    pass: "727d361eff1f94"
  }
});
