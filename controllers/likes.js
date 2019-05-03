const { Like, Answer, User, Comment } = require("../config/database");

const include = [
  { model: User },
  { model: Like, include: { model: User } },
  { model: Comment, include: { model: User } }
];

const create = async (req, res, next) => {
  const { answerId } = req.params;

  try {
    const answer = await Answer.findOne({
      where: { id: answerId },
      include
    });
    const alreadyLiked =
      answer.likes.filter(like => like.userId == req.user.id).length > 0;
    if (alreadyLiked) {
      throw new Error("Already liked");
    } else {
      await Like.create({
        userId: req.user.id,
        answerId
      });
      const toReturn = await Answer.findOne({
        where: { id: answerId },
        include
      });
      res.json({ answer: toReturn });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { answerId, id } = req.params;
  try {
    await Like.destroy({ where: { id } });
    const toReturn = await Answer.findOne({
      where: { id: answerId },
      include
    });
    res.json({ answer: toReturn });
  } catch (error) {
    res.status(400).json({ messsage: error.message });
  }
};

module.exports = {
  create,
  remove
};
