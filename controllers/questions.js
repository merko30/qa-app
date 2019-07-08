const Sequelize = require("sequelize");
const {
  Question,
  User,
  Answer,
  Like,
  Comment,
  Tag
} = require("../config/database");

const perPage = 6;
const questionsPerPage = 12;

const include = [
  { model: User },
  { model: Tag },
  {
    model: Answer,
    include: [
      { model: User },
      {
        model: Like,
        include: { model: User }
      },
      { model: Comment, include: { model: User } }
    ]
  }
];

const findAll = async (req, res, next) => {
  let { page = 1 } = req.query;
  try {
    const { rows, count } = await Question.findAndCountAll({
      distinct: true,
      include,
      order: [["createdAt", "DESC"]],
      limit: questionsPerPage,
      offset: questionsPerPage * (page - 1)
    });
    const nextPage = ++page;
    res.json({
      questions: rows,
      meta: { next: nextPage, count, perPage: questionsPerPage }
    });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  const { id } = req.params;
  let { page = 1 } = req.query;
  try {
    const question = await Question.findOne({
      where: { id },
      attributes: [
        "text",
        "createdAt",
        "updatedAt",
        "id",
        "title",
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM answers WHERE questionId = ${id})`
          ),
          "answerCount"
        ]
      ],
      include: [
        { model: User },
        { model: Tag },
        {
          model: Answer,
          as: "answers",
          include: [
            { model: User },
            {
              model: Like,
              include: { model: User }
            },
            { model: Comment, include: { model: User } }
          ],
          limit: perPage,
          offset: perPage * (page - 1),
          group: ["answer.id", "likes.id", "comments.id"]
        }
      ]
    });
    const nextPage = ++page;
    res.json({ question, meta: { next: nextPage, perPage } });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { text, title } = req.body;
  try {
    const question = await Question.create({
      title,
      text,
      userId: req.user.id
    });
    question.addTags(req.body.tags);
    question.save();
    const withAssociations = await Question.findOne({
      where: { id: question.id },
      include
    });
    res.json({ question: withAssociations });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Question.update(req.body, { where: { id } });
    const withAssociations = await Question.findOne({
      where: { id },
      include
    });
    res.json({ question: withAssociations });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Question.destroy({ where: { id } });
    res.json({ id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  remove,
  update
};
