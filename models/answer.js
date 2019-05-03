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
          args: [12, 150],
          msg: "Answer must have at least 12 characters."
        }
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
