const { Answer, User, Comment, Like } = require("../config/database");

const include = [
  { model: User },
  { model: Comment, include: { model: User } },
  { model: Like, include: { model: User } }
];

const create = async (req, res, next) => {
  const { text } = req.body;
  const { questionId } = req.params;
  try {
    const answer = await Answer.create({
      text,
      userId: req.user.id,
      questionId
    });
    const toReturn = await Answer.findOne({
      where: { id: answer.id },
      include
    });
    res.json({ answer: toReturn });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    await Answer.update({ text }, { where: { id } });
    const newAnswer = await Answer.findOne({
      where: { id },
      include
    });
    res.json({ answer: newAnswer });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Answer.destroy({ where: { id } });
    res.json({ id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  update,
  remove
};
