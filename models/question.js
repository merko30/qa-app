module.exports = (sequelize, type) => {
  const Question = sequelize.define("question", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: type.STRING,
      validate: {
        len: {
          args: [24, 150],
          msg: "Question must have at least 24 characters."
        }
      }
    }
  });

  Question.associate = ({ User, Answer }) => {
    Question.belongsTo(User);
    Question.hasMany(Answer, { onDelete: "set null" });
  };

  return Question;
};
