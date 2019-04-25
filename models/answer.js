module.exports = (sequelize, type) => {
  const Answer = sequelize.define("answer", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: type.STRING,
      validate: {
        len: {
          args: [6, 150],
          msg: "Answer must have at least 6 characters."
        }
      }
    }
  });

  Answer.associate = models => {
    Answer.belongsTo(models.Question);
  };

  Answer.associate = models => {
    Answer.belongsTo(models.Answer);
  };

  return Answer;
};
