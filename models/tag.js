module.exports = (sequelize, type) => {
  const Tag = sequelize.define("tag", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING,
      validate: {
        len: {
          args: [5,25],  
          msg: "Tag length must be between 16 and 100 characters."
        }
      }
    },
  });

  Tag.associate = ({ Question }) => {
    Tag.hasOne(Question);
  };

  return Tag;
};
