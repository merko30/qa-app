import {
  ADD_ANSWER,
  ADD_ANSWER_SUCCESS,
  ADD_ANSWER_FAILURE,
  EDIT_ANSWER,
  EDIT_ANSWER_SUCCESS,
  EDIT_ANSWER_FAILURE,
  DELETE_ANSWER,
  DELETE_ANSWER_SUCCESS,
  DELETE_ANSWER_FAILURE
} from "../constants/answers";
import {
  updateQuestionAnswers,
  updateAnswerInQuestions,
  removeAnswerFromQuestion
} from "./questions";
import { AnswerService } from "../utils/answers";

export const addAnswerRequest = () => ({ type: ADD_ANSWER });
export const addAnswerSuccess = answer => ({
  type: ADD_ANSWER_SUCCESS,
  payload: answer
});
export const addAnswerFailure = error => ({
  type: ADD_ANSWER_FAILURE,
  payload: error
});

export const editAnswerStart = () => ({ type: EDIT_ANSWER });
export const editAnswerSuccess = answer => ({
  type: EDIT_ANSWER_SUCCESS,
  payload: answer
});
export const editAnswerFailure = error => ({
  type: EDIT_ANSWER_FAILURE,
  payload: error
});

export const deleteAnswerStart = () => ({ type: DELETE_ANSWER });
export const deleteAnswerSuccess = answer => ({
  type: DELETE_ANSWER_SUCCESS,
  payload: answer
});
export const deleteAnswerFailure = error => ({
  type: DELETE_ANSWER_FAILURE,
  payload: error
});

export const addAnswer = (questionId, data) => async dispatch => {
  const token = localStorage.getItem("token");
  dispatch(addAnswerRequest());
  try {
    const answer = await (await fetch(`/api/a/${questionId}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })).json();
    dispatch(addAnswerSuccess(answer.answer));
    dispatch(updateQuestionAnswers(answer.answer));
  } catch (error) {
    dispatch(addAnswerFailure(error));
  }
};

export const editAnswer = (questionId, answerId, data) => async dispatch => {
  dispatch(editAnswerStart());
  try {
    const { answer } = await AnswerService.editAnswerRequest(
      questionId,
      answerId,
      data
    );
    dispatch(editAnswerSuccess(answer));
    dispatch(updateAnswerInQuestions(answer));
  } catch (error) {
    dispatch(editAnswerFailure(error));
  }
};

export const removeAnswer = answerId => async dispatch => {
  dispatch(deleteAnswerStart());
  try {
    const answer = await AnswerService.deleteAnswerRequest(answerId);
    dispatch(deleteAnswerSuccess(answer));
    dispatch(removeAnswerFromQuestion(answer));
  } catch (error) {
    dispatch(deleteAnswerFailure(error));
  }
};
