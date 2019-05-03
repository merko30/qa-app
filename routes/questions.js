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

const middlewares = require("../config/authorMiddleware");

router
  .route("/")
  .get(findAll)
  .post(passport.authenticate("jwt", { session: false }), create);

router
  .route("/:id")
  .get(findOne)
  .delete(middlewares("question"), remove)
  .put(middlewares("question"), update);

module.exports = router;
