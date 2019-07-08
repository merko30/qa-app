const { Tag } = require("../config/database");

const findAll = async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    res.json({ tags });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body);
    res.json({ tag });
  } catch (error) {
    next(error);
  }
};

module.exports = { findAll, create };
