const transport = require('../config/emailTransport');

module.exports = (to, token, callback) => {
    var mailOptions = {
          to: user.email,
          from: "app@fake.com",
          subject: "Password Reset",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://localhost:3000/reset/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n"
        };
        transport.sendMail(mailOptions, function(err) {
          callback(err);
        });
}