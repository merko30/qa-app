module.exports = (sequelize, type) => {
  const Question = sequelize.define("question", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: type.STRING,
      validate: {
        len: {
          args: [16, 100],
          msg: "Question title length must be between 16 and 100 characters."
        }
      }
    },
    text: {
      type: type.TEXT,
      validate: {
        len: {
          args: [25, 500],
          msg: "Question must have at least 16 characters."
        }
      }
    }
  });

  Question.associate = ({ User, Answer, Tag }) => {
    Question.belongsTo(User);
    Question.hasMany(Answer, { onDelete: "set null" });
    Question.hasMany(Tag, { onDelete: "set null" });
  };

  return Question;
};
