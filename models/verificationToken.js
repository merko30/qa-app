module.exports = function(sequelize, DataTypes) {
  const VerificationToken = sequelize.define("VerificationToken", {
    token: DataTypes.STRING
  });

  VerificationToken.associate = function({ User }) {
    VerificationToken.belongsTo(User);
  };
  return VerificationToken;
};
