const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const passport = require("passport");

const passportConfig = require("./passport");

module.exports = app => {
  app.use("/uploads", express.static("uploads"));

  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());
  app.use(cors());
  app.use(passport.initialize());
  passportConfig(passport);
};
