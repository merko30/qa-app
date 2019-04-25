const { Question, User, Answer } = require("../config/database");

const findAll = async (req, res, next) => {
  const questions = await Question.findAll({
    include: [{ model: User }, { model: Answer }],
    order: [["createdAt", "DESC"]]
  });
  res.json({ questions });
};

const findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const question = await Question.findOne({
      where: { id },
      include: [{ model: User }, { model: Answer }]
    });
    res.json({ question });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res, next) => {
  const { text } = req.body;
  try {
    const question = await Question.create({ text, userId: req.user.id });
    const withAssociations = await Question.findOne({
      where: { id: question.id },
      include: [{ model: User }, { model: Answer }]
    });
    res.json({ question: withAssociations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const updatedQuestion = await Question.update({ text }, { where: { id } });
    res.json({ question: updatedQuestion });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Question.destroy({ where: { id } });
    res.json({ message: "Question deleted" });
  } catch (error) {
    res.status(400).json({ messsage: error.message });
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  remove,
  update
};
