const express = require("express");

const router = express.Router();

const questions = require("./questions");
const users = require("./users");
const answers = require("./answers");

router.use("/q", questions);
router.use("/a", answers);
router.use("/auth", users);

module.exports = router;
