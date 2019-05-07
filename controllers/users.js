const jwt = require("jsonwebtoken");
const async = require("async");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Op = require("sequelize").Op;
const bcrypt = require("bcrypt");
const transport = require("../config/emailTransport");

const { Question, User, Answer } = require("../config/database");

const include = [{ model: Answer }, { model: Question }];

const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id },
      include,
      attributes: { exclude: ["password"] }
    });
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  const { username, name, email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const user = await User.create({
        name,
        username,
        email,
        password,
        avatar: req.file.filename
      });
      res.json({ user });
    } else {
      throw new Error("User exists");
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    } else {
      const validPassword = user.validatePassword(password);
      if (validPassword) {
        const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "7d" });
        res.json({ token, user });
      } else {
        throw new Error("Wrong password");
      }
    }
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  async.waterfall(
    [
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          const token = buf.toString("hex");
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({
          where: {
            email
          }
        }).then(user => {
          if (!user) {
            throw new Error("User with that email does not exist");
          }
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          user.save().then((r, err) => {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var mailOptions = {
          to: user.email,
          from: "app@fake.com",
          subject: "Password Reset",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://localhost:3000/reset/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n"
        };
        transport.sendMail(mailOptions, function(err) {
          done(err);
        });
      }
    ],
    function(err) {
      res.json({
        message: "Email has been sent to your email address, please check it"
      });
    }
  );
};

const reset = function(req, res, next) {
  async.waterfall(
    [
      function(done) {
        User.findOne({
          where: {
            resetPasswordToken: req.params.token
          }
        }).then(async user => {
          if (!user) {
            res.status(401).json({ message: "Link has expired" });
          }
          user.password = await bcrypt.hash(req.body.password, 10);
          user.resetPasswordToken = null;
          user.resetPasswordExpires = null;

          user.save().then((t, err) => {
            done(err, user);
          });
        });
      },
      function(user, done) {
        var mailOptions = {
          to: user.email,
          from: "app@fake.com",
          subject: "Password Reset",
          text:
            "Hello,\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n"
        };
        transport.sendMail(mailOptions, function(err) {
          done(err);
        });
      }
    ],
    function(err) {
      res.json({ message: "Password has been changed" });
    }
  );
};

const editUser = async (req, res, next) => {
  try {
    await User.update(req.body, {
      individualHooks: true,
      where: { id: req.user.id }
    });
    const toReturn = await User.findOne({
      where: { id: req.user.id },
      include
    });
    res.json({ user: toReturn });
  } catch (error) {
    next(error);
  }
};

const changeAvatar = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id }
    });
    user.avatar = req.file.filename;
    await user.save();
    const toReturn = await User.findOne({
      where: { id: req.user.id },
      include
    });
    res.json({
      user: toReturn
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getUser,
  forgotPassword,
  reset,
  editUser,
  changeAvatar
};
