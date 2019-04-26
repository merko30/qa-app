import {
  UPDATE_QUESTION_ANSWERS,
  UPDATE_ANSWER_IN_QUESTION,
  REMOVE_ANSWER_FROM_QUESTION
} from "../constants/questions";

import { QuestionService } from "../services/questions";

import createAction from "../utils/createAction";

const fetchAll = createAction("FETCH_QUESTIONS");
const fetchOne = createAction("FETCH_QUESTION");
const remove = createAction("REMOVE_QUESTION");
const add = createAction("ADD_QUESTION");
const edit = createAction("EDIT_QUESTION");

export const getQuestions = () => async dispatch => {
  dispatch(fetchAll.start());
  try {
    const questions = await QuestionService.fetchAll();
    dispatch(fetchAll.success(questions));
  } catch (error) {
    dispatch(fetchAll.failure(error));
  }
};

export const addQuestion = data => async dispatch => {
  dispatch(add.start());
  try {
    const { question } = await QuestionService.addQuestionRequest(data);
    dispatch(add.success(question));
  } catch (error) {
    dispatch(add.failure(error));
  }
};

export const getQuestion = id => async dispatch => {
  dispatch(fetchOne.start());
  try {
    const { question } = await QuestionService.fetchOneRequest(id);
    dispatch(fetchOne.success(question));
  } catch (error) {
    dispatch(fetchOne.failure(error));
  }
};

export const editQuestion = (questionId, data) => async dispatch => {
  dispatch(edit.start());
  try {
    const { question } = await QuestionService.editQuestionRequest(
      questionId,
      data
    );
    dispatch(edit.success(question));
  } catch (error) {
    dispatch(edit.failure(error));
  }
};

export const removeQuestion = questionId => async dispatch => {
  dispatch(remove.start());
  try {
    const question = await QuestionService.deleteQuestionRequest(questionId);
    dispatch(remove.success(question));
  } catch (error) {
    dispatch(remove.failure(error));
  }
};

export const updateQuestionAnswers = answer => dispatch => {
  dispatch({ type: UPDATE_QUESTION_ANSWERS, payload: answer });
};

export const updateAnswerInQuestions = answer => dispatch => {
  dispatch({ type: UPDATE_ANSWER_IN_QUESTION, payload: answer });
};

export const removeAnswerFromQuestion = answer => dispatch => {
  dispatch({ type: REMOVE_ANSWER_FROM_QUESTION, payload: answer });
};
