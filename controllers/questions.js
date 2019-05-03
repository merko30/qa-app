const { Question, User, Answer, Like, Comment } = require("../config/database");

const include = [
  { model: User },
  {
    model: Answer,
    include: [
      { model: User },
      { model: Like, include: { model: User } },
      { model: Comment, include: { model: User } }
    ]
  }
];

const findAll = async (req, res, next) => {
  try {
    const questions = await Question.findAll({
      include,
      order: [["createdAt", "DESC"]]
    });
    res.json({ questions });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const question = await Question.findOne({
      where: { id },
      include
    });
    res.json({ question });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { text } = req.body;
  try {
    const question = await Question.create({ text, userId: req.user.id });
    const withAssociations = await Question.findOne({
      where: { id: question.id },
      include
    });
    res.json({ question: withAssociations });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    await Question.update({ text }, { where: { id } });
    const withAssociations = await Question.findOne({
      where: { id },
      include
    });
    res.json({ question: withAssociations });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Question.destroy({ where: { id } });
    res.json({ id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  remove,
  update
};
