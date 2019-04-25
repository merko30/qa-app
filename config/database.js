const Sequelize = require("sequelize");

const UserModel = require("../models/user");
const QuestionModel = require("../models/question");
const AnswerModel = require("../models/answer");

const sequelize = new Sequelize("db", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// models
const User = UserModel(sequelize, Sequelize);
const Question = QuestionModel(sequelize, Sequelize);
const Answer = AnswerModel(sequelize, Sequelize);

// relations
User.hasMany(Question, { onDelete: "set null" });
Question.belongsTo(User);
User.hasMany(Answer, { onDelete: "set null" });
Question.hasMany(Answer, { onDelete: "set null" });
Answer.belongsTo(User);
Answer.belongsTo(Question);

sequelize.sync({ force: false }).then(() => {
  console.log(`Database running...`);
});

module.exports = {
  User,
  Question,
  Answer
};
