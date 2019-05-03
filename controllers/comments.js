const { Comment, User, Like, Answer } = require("../config/database");

const include = [
  { model: User },
  { model: Like, include: { model: User } },
  { model: Comment, include: { model: User } }
];

const create = async (req, res, next) => {
  const { text } = req.body;
  const { answerId } = req.params;
  try {
    await Comment.create({
      text,
      userId: req.user.id,
      answerId
    });
    const toReturn = await Answer.findOne({
      where: { id: answerId },
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
    await Comment.update({ text }, { where: { id } });
    const newComment = await Comment.findOne({
      where: { id },
      include: { model: User }
    });
    res.json({ comment: newComment });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Comment.destroy({ where: { id } });
    res.json({ id });
  } catch (error) {
    res.status(400).json({ messsage: error.message });
  }
};

module.exports = {
  create,
  update,
  remove
};
