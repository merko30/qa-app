const express = require("express");

const { register, login, findAll } = require("../controllers/users");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/", findAll);

module.exports = router;
