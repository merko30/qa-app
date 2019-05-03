const bcrypt = require("bcrypt");

module.exports = (sequelize, type) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: type.STRING,
      username: {
        type: type.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 250],
            msg: "Username must be longer than 8 characters"
          }
        }
      },
      email: {
        type: type.STRING,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: type.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 250],
            msg: "Password must be longer than 8 characters"
          }
        }
      }
    },
    {
      hooks: {
        beforeCreate: async function(model) {
          const hashedPassword = await bcrypt.hash(
            model.dataValues.password,
            10
          );
          model.dataValues.password = hashedPassword;
        }
      }
    }
  );

  User.associate = ({ Question, Answer }) => {
    User.hasMany(Question, { onDelete: "set null" });
    User.hasMany(Answer, { onDelete: "set null" });
  };

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
