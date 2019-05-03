const { Answer, Question, Like, Comment } = require("../config/database");

module.exports = param =>
  async function(req, res, next) {
    const {
      params: { id }
    } = req;
    let doc;
    if (param === "question") {
      doc = await Question.findOne({ where: { id } });
    } else if (param === "answer") {
      doc = await Answer.findOne({ where: { id } });
    } else if (param === "like") {
      doc = await Like.findOne({ where: { id } });
      console.log(id);
      console.log(doc);
    } else if (param === "comment") {
      doc = await Comment.findOne({ where: { id } });
    }
    const matches = doc.userId === req.user.id;
    if (matches) {
      return next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
