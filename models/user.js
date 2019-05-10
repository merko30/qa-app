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
      name: {
        type: type.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 36],
            msg: "Name must be longer than 6 characters"
          }
        }
      },
      avatar: {
        type: type.STRING,
        allowNull: true
      },
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
      },
      resetPasswordToken: {
        allowNull: true,
        type: type.STRING
      },
      resetPasswordExpires: {
        allowNull: true,
        type: type.DATE
      },
      resetEmailToken: {
        allowNull: true,
        type: type.STRING
      },
      resetEmailExpires: {
        allowNull: true,
        type: type.DATE
      },
      isVerified: type.BOOLEAN
    },
    {
      hooks: {
        beforeCreate: async function(model) {
          const hashedPassword = await bcrypt.hash(
            model.dataValues.password,
            10
          );
          model.dataValues.password = hashedPassword;
        },
        beforeUpdate: async function(model) {
          const exists = await User.findOne({ where: { email: model.email } });
          if (exists && exists.id && exists.id !== model.id) {
            throw new Error("User with that email exists");
          }
        }
      }
    }
  );

  User.associate = ({ Question, Answer, User, VerificationToken }) => {
    User.hasMany(Question, { onDelete: "CASCADE" });
    User.hasMany(Answer, { onDelete: "CASCADE" });
    User.hasOne(VerificationToken);
  };

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
