const jwt = require("jsonwebtoken");
const async = require("async");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const {
  Question,
  User,
  Answer,
  VerificationToken
} = require("../config/database");

const sendVerificationEmail = require("../utils/sendVerificationEmail");
const sendPasswordChangeConfirmation = require('../utils/sendPasswordChangeConfirmation');

const include = [{ model: Answer, offset: 5, limit: 5 }, { model: Question }];

const getUser = async (req, res, next) => {
  const { id } = req.user;
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
  return User.findOrCreate({
    where: { email: req.body.email },
    defaults: req.body
  })
    .spread(async (user, created) => {
      if (!created) {
        throw new Error("User exists");
      } else {
        if (req.file) {
          user.avatar = req.file.filename;
        }
        await user.save();
        VerificationToken.create({
          userId: user.id,
          token: crypto.randomBytes(20).toString("hex")
        }).then(result => {
          sendVerificationEmail(user.email, result.token, "new");
          res.json({
            message: `${
              user.email
            } account created successfully. Verify your email!`
          });
        });
      }
    })
    .catch(error => {
      next(error);
    });
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
        if (user.isVerified) {
          const token = jwt.sign({ id: user.id }, "secret", {
            expiresIn: "7d"
          });
          res.json({ token, user });
        } else {
          throw new Error("Account is not verified!");
        }
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
        })
          .then(user => {
            if (!user) {
              throw new Error("User with that email does not exist");
            }
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
            user.save().then((r, err) => {
              done(err, token, user);
            });
          })
          .catch(error => {
            next(error);
          });
      },
      function(token, user, done) {
        sendPasswordResetEmail(user.email, token, done);
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
        sendPasswordChangeConfirmation(user.email, done);
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
    if (req.file) {
      user.avatar = req.file.filename;
      await user.save();
      const toReturn = await User.findOne({
        where: { id: req.user.id },
        include
      });
      res.json({
        user: toReturn
      });
    } else {
      throw new Error("You must pick an image!");
    }
  } catch (error) {
    next(error);
  }
};

const changeEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      where: { email }
    });
    if (user) {
      throw new Error("Email already in use");
    } else {
      const resetEmailToken = crypto.randomBytes(20).toString("hex");
      await User.update({ resetEmailToken }, { where: { id: req.user.id } });
      sendVerificationEmail(email, resetEmailToken, "change");
      res.json({
        message: `Verification email has been sent to ${email}`
      });
    }
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  const { password, newPassword } = req.body;
  try {
    const user = await User.findOne({
      where: { id: req.user.id }
    });
    if (!user) {
      throw new Error("User not found");
    } else {
      if (user.validatePassword(password)) {
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        const toReturn = await User.findOne({
          where: { id: req.user.id },
          include
        });
        res.json({ message: "Your password has been updated", user: toReturn });
      } else {
        throw new Error("Wrong password");
      }
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { password } = req.body;
  try {
    const user = await User.findOne({
      where: { id: req.user.id }
    });
    if (user.validatePassword(password)) {
      await user.destroy();
      res.json({ message: "User deleted" });
    } else {
      throw new Error("Wrong password");
    }
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
  changeAvatar,
  changeEmail,
  deleteUser,
  changePassword
};
