const express = require("express");
const passport = require("passport");

const router = express.Router();

const middlewares = require("../config/authorMiddleware");
const { create, remove } = require("../controllers/likes");

router
  .route("/:answerId")
  .post(passport.authenticate("jwt", { session: false }), create);

router.delete("/:answerId/:id", middlewares("like"), remove);

module.exports = router;
