const express = require("express");

const router = express.Router();

const questions = require("./questions");
const users = require("./users");
const answers = require("./answers");
const comments = require("./comments");
const likes = require("./likes");
const tags = require("./tags");

router.use("/q", questions);
router.use("/a", answers);
router.use("/likes", likes);
router.use("/comments", comments);
router.use("/tags", tags);
router.use("/auth", users);

module.exports = router;
