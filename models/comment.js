module.exports = (sequelize, type) => {
  const Comment = sequelize.define("comment", {
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
          msg: "Comment must have at least 12 characters."
        }
      }
    }
  });

  Comment.associate = ({ User, Answer }) => {
    Comment.belongsTo(User);
    Comment.belongsTo(Answer);
  };

  return Comment;
};
