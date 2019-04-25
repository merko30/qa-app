import {
  FETCH_QUESTIONS,
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTION,
  FETCH_QUESTION_FAILURE,
  FETCH_QUESTION_SUCCESS,
  ADD_QUESTION,
  ADD_QUESTION_FAILURE,
  ADD_QUESTION_SUCCESS,
  UPDATE_QUESTION_ANSWERS
} from "../constants/questions";

export const fetchQuestions = () => ({ type: FETCH_QUESTIONS });
export const fetchQuestionsSuccess = questions => ({
  type: FETCH_QUESTIONS_SUCCESS,
  payload: questions
});
export const fetchQuestionsFailure = error => ({
  type: FETCH_QUESTIONS_FAILURE,
  payload: error
});

export const fetchQuestion = () => ({ type: FETCH_QUESTION });
export const fetchQuestionSuccess = questions => ({
  type: FETCH_QUESTION_SUCCESS,
  payload: questions
});
export const fetchQuestionFailure = error => ({
  type: FETCH_QUESTION_FAILURE,
  payload: error
});

export const addQuestionRequest = () => ({ type: ADD_QUESTION });
export const addQuestionSuccess = question => ({
  type: ADD_QUESTION_SUCCESS,
  payload: question
});
export const addQuestionFailure = error => ({
  type: ADD_QUESTION_FAILURE,
  payload: error
});

export const getQuestions = () => async dispatch => {
  dispatch(fetchQuestions());
  try {
    const questions = await (await fetch("/api/q", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })).json();
    dispatch(fetchQuestionsSuccess(questions));
  } catch (error) {
    dispatch(fetchQuestionsFailure(error));
  }
};

export const addQuestion = data => async dispatch => {
  const token = localStorage.getItem("token");
  dispatch(addQuestionRequest());
  try {
    const question = await (await fetch(`/api/q/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })).json();
    dispatch(addQuestionSuccess(question.question));
  } catch (error) {
    dispatch(addQuestionFailure(error));
  }
};

export const getQuestion = id => async dispatch => {
  dispatch(fetchQuestion());
  try {
    const question = await (await fetch(`/api/q/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })).json();
    dispatch(fetchQuestionSuccess(question));
  } catch (error) {
    dispatch(fetchQuestionFailure(error));
  }
};

export const updateQuestionAnswers = answer => dispatch => {
  dispatch({ type: UPDATE_QUESTION_ANSWERS, payload: answer });
};
