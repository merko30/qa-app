const jwt = require("jsonwebtoken");

const { Question } = require("../config/database");

const { User } = require("../config/database");

const findAll = async (req, res, next) => {
  try {
    const users = await User.findAll({ include: [{ model: Question }] });
    res.json({ users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const register = async (req, res, next) => {
  const { username, name, email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const user = await User.create({
        name,
        username,
        email,
        password
      });
      res.json({ user });
    } else {
      throw new Error("User exists");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  findAll
};
