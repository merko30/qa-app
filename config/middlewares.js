const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const passportConfig = require("./passport");

module.exports = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(passport.initialize());
  passportConfig(passport);
};
