const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const UserModel = require("../models/user");
const QuestionModel = require("../models/question");
const AnswerModel = require("../models/answer");
const LikeModel = require("../models/like");
const CommentModel = require("../models/comment");
const VerificationTokenModel = require("../models/verificationToken");
const TagModel = require("../models/tag");

const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER
} = process.env;

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: "mysql",
    port: DATABASE_PORT,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const User = UserModel(sequelize, Sequelize);
const Question = QuestionModel(sequelize, Sequelize);
const Answer = AnswerModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);
const Like = LikeModel(sequelize, Sequelize);
const VerificationToken = VerificationTokenModel(sequelize, Sequelize);
const Tag = TagModel(sequelize, Sequelize);

const models = {
  User,
  Question,
  Answer,
  Comment,
  Like,
  VerificationToken,
  Tag
};

Object.keys(models).forEach(key => {
  if (models[key] && models[key].associate) {
    models[key].associate(models);
  }
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("It worked!");
  })
  .catch(err => {
    console.log("An error occurred while creating the table:", err);
  });

module.exports = models;
