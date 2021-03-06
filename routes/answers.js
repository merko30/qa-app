const express = require("express");
const passport = require("passport");

const router = express.Router();

const middlewares = require("../config/authorMiddleware");
const { create, update, remove } = require("../controllers/answers");

router
  .route("/:questionId")
  .post(passport.authenticate("jwt", { session: false }), create);

router.put("/:questionId/:id", middlewares("answer"), update);

router.delete("/:id", middlewares("answer"), remove);

module.exports = router;
