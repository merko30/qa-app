const transport = require("../config/emailTransport");

module.exports = (to, token, status) => {
  var mailOptions = {
    to: to,
    from: "app@fake.com",
    subject: "Email verification",
    text: `Click on this link to verify your email http://localhost:3000/verification?token=${token}&email=${to}&status=${status}`
  };
  transport.sendMail(mailOptions);
};
