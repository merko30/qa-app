const {
  User,
  VerificationToken,
  Question,
  Answer
} = require("../config/database");

const verifyEmail = async (req, res, next) => {
  const { email, token } = req.query;
  try {
    const user = await User.findOne({ where: { email } });
    if (user.isVerified) {
      return res.status(202).json({ message: "Email is already verified" });
    } else {
      try {
        const verificationToken = await VerificationToken.findOne({
          where: { token }
        });

        if (verificationToken) {
          user
            .update({ isVerified: true })
            .then(updated => {
              res.json({ message: "Email has been verified" });
            })
            .catch(error => {
              throw new Error(`Verification failed`);
            });
        } else {
          throw new Error(`Token expired`);
        }
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
};

const verifyChangeEmail = async (req, res, next) => {
  const { email, token } = req.query;
  try {
    const user = await User.findOne({ where: { resetEmailToken: token } });
    if (user) {
      user.email = email;
      try {
        await user.save();
        const toReturn = await User.findOne({
          where: { resetEmailToken: token },
          include: [{ model: Answer }, { model: Question }]
        });
        res.json({ message: "Email has been changed", user: toReturn });
      } catch (error) {
        next(error);
      }
    } else {
      throw new Error("Token has expired, try again!");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyEmail,
  verifyChangeEmail
};
