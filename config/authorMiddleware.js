const checkAuthorMiddleware = require("../utils/checkAuthorMiddleware");
const passport = require("passport");

module.exports = name => {
  return [
    passport.authenticate("jwt", { session: false }),
    checkAuthorMiddleware(name)
  ];
};
