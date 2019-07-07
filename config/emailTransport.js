const nodemailer = require("nodemailer");


// const {
//   NODEMAILER_HOST = "smtp.mailtrap.io",
//   NODEMAILER_AUTH_USER = "92c69a5c93539a",
//   NODEMAILER_AUTH_PASSWORD = "727d361eff1f94"
// } = process.env;

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "92c69a5c93539a",
    pass: "727d361eff1f94"
  }
});
