const { Answer, Question } = require("../config/database");

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
    }
    const matches = doc.userId === req.user.id;
    if (matches) {
      return next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
