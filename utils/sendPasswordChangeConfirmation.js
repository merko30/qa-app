
module.exports = (to, callback) => {
  var mailOptions = {
    to: to,
    from: "app@fake.com",
    subject: "Password Reset",
    text:
      "Hello,\n\n" +
      "This is a confirmation that the password for your account " +
      to +
      " has just been changed.\n"
  };
  transport.sendMail(mailOptions, function(err) {
    callback(err);
  });
}