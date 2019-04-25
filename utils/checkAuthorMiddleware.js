const { Answer, Question } = require("../config/database");

module.exports = param =>
  async function(req, res, next) {
    let doc;
    if (param === "question") {
      doc = await Question.findOne({ where: { id: req.params.id } });
    } else {
      doc = await Answer.findOne({ where: { id: req.params.id } });
    }

    const matches = doc.userId === req.user.id;

    if (matches) {
      return next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
