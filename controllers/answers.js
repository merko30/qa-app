const { Answer } = require("../config/database");

const create = async (req, res, next) => {
  const { text } = req.body;
  const { questionId } = req.params;
  try {
    const answer = await Answer.create({
      text,
      userId: req.user.id,
      questionId
    });
    res.json({ answer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const updatedAnswer = await Answer.update({ text }, { where: { id } });
    res.json({ question: updatedAnswer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Answer.destroy({ where: { id } });
    res.json({ message: "Answer deleted" });
  } catch (error) {
    res.status(400).json({ messsage: error.message });
  }
};

module.exports = {
  create,
  update,
  remove
};
