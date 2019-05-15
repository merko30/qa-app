module.exports = (sequelize, type) => {
  const Answer = sequelize.define("answer", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: type.TEXT,
      validate: {
        min: 12
      }
    }
  });

  Answer.associate = ({ User, Question, Comment, Like }) => {
    Answer.belongsTo(User);
    Answer.belongsTo(Question);
    Answer.hasMany(Comment);
    Answer.hasMany(Like);
  };

  return Answer;
};
