import {
  ADD_ANSWER,
  ADD_ANSWER_SUCCESS,
  ADD_ANSWER_FAILURE
} from "../constants/answers";
import { updateQuestionAnswers } from "./questions";

export const addAnswerRequest = () => ({ type: ADD_ANSWER });
export const addAnswerSuccess = answer => ({
  type: ADD_ANSWER_SUCCESS,
  payload: answer
});
export const addAnswerFailure = error => ({
  type: ADD_ANSWER_FAILURE,
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
