module.exports = (sequelize, type) => {
  const Like = sequelize.define("like", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  Like.associate = ({ User, Answer }) => {
    Like.belongsTo(User);
    Like.belongsTo(Answer);
  };

  return Like;
};
