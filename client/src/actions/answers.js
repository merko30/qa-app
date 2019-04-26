import {
  updateQuestionAnswers,
  updateAnswerInQuestions,
  removeAnswerFromQuestion
} from "./questions";
import AnswerService from "../services/answers";
import createAction from "../utils/createAction";

const add = createAction("ADD_ANSWER");
const edit = createAction("EDIT_ANSWER");
const remove = createAction("DELETE_ANSWER");

export const addAnswer = (questionId, data) => async dispatch => {
  dispatch(add.start());
  try {
    const { answer } = await AnswerService.addAnswerRequest(questionId, data);
    dispatch(add.success(answer));
    dispatch(updateQuestionAnswers(answer));
  } catch (error) {
    dispatch(add.failure(error));
  }
};

export const editAnswer = (questionId, answerId, data) => async dispatch => {
  dispatch(edit.start());
  try {
    const { answer } = await AnswerService.editAnswerRequest(
      questionId,
      answerId,
      data
    );
    dispatch(edit.success(answer));
    dispatch(updateAnswerInQuestions(answer));
  } catch (error) {
    dispatch(edit.failure(error));
  }
};

export const removeAnswer = answerId => async dispatch => {
  dispatch(remove.start());
  try {
    const answer = await AnswerService.deleteAnswerRequest(answerId);
    dispatch(remove.success(answer));
    dispatch(removeAnswerFromQuestion(answer));
  } catch (error) {
    dispatch(remove.failure(error));
  }
};
