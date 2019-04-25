const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
  findAll,
  create,
  findOne,
  remove,
  update
} = require("../controllers/questions");

const checkAuthorMiddleware = require("../utils/checkAuthorMiddleware");

const middlewares = [
  passport.authenticate("jwt", { session: false }),
  checkAuthorMiddleware("question")
];

router
  .route("/")
  .get(findAll)
  .post(passport.authenticate("jwt", { session: false }), create);

router
  .route("/:id")
  .get(findOne)
  .delete(middlewares, remove)
  .put(middlewares, update);

module.exports = router;
