const { Answer, User } = require("../config/database");

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
      include: { model: User }
    });
    res.json({ answer: toReturn });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    await Answer.update({ text }, { where: { id } });
    const newAnswer = await Answer.findOne({
      where: { id },
      include: { model: User }
    });
    res.json({ answer: newAnswer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Answer.destroy({ where: { id } });
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
