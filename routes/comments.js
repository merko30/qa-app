const express = require("express");
const passport = require("passport");

const router = express.Router();

const middlewares = require("../config/authorMiddleware");
const { create, update, remove } = require("../controllers/comments");

router
  .route("/:answerId")
  .post(passport.authenticate("jwt", { session: false }), create);

router.put("/:answerId/:id", middlewares("comment"), update);

router.delete("/:id", middlewares("comment"), remove);

module.exports = router;
