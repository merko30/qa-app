const express = require("express");
const passport = require("passport");

const router = express.Router();

const checkAuthorMiddleware = require("../utils/checkAuthorMiddleware");
const { create, update, remove } = require("../controllers/answers");

const middlewares = [
  passport.authenticate("jwt", { session: false }),
  checkAuthorMiddleware("answer")
];

router
  .route("/:questionId")
  .post(passport.authenticate("jwt", { session: false }), create);

router.put("/:questionId/:id", middlewares, update);

router.delete("/:id", middlewares, remove);

module.exports = router;
