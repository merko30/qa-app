import {
  FETCH_QUESTIONS,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTION,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION,
  ADD_QUESTION_FAILURE,
  UPDATE_QUESTION_ANSWERS,
  REMOVE_ANSWER_FROM_QUESTION,
  UPDATE_ANSWER_IN_QUESTION,
  EDIT_QUESTION,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_FAILURE,
  REMOVE_QUESTION_FAILURE,
  REMOVE_QUESTION,
  REMOVE_QUESTION_SUCCESS
} from "../constants/questions";

const initialState = {
  questions: [],
  loading: false,
  error: null,
  question: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUESTIONS:
    case FETCH_QUESTION:
    case ADD_QUESTION:
    case EDIT_QUESTION:
    case REMOVE_QUESTION:
      return {
        ...state,
        loading: true
      };
    case FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: action.payload.questions
      };
    case FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        question: action.payload
      };
    case FETCH_QUESTIONS_FAILURE:
    case FETCH_QUESTION_FAILURE:
    case ADD_QUESTION_FAILURE:
    case EDIT_QUESTION_FAILURE:
    case REMOVE_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      };
    case ADD_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: [action.payload, ...state.questions]
      };
    case UPDATE_QUESTION_ANSWERS:
      return {
        ...state,
        question: {
          ...state.question,
          answers: [...state.question.answers, action.payload]
        }
      };
    case UPDATE_ANSWER_IN_QUESTION:
      const newAnswer = action.payload;
      const index = state.question.answers.findIndex(answer => {
        return answer.id === newAnswer.id;
      });
      const newAnswers = state.question.answers.slice();
      newAnswers[index] = newAnswer;
      return {
        ...state,
        question: {
          ...state.question,
          answers: newAnswers
        }
      };
    case REMOVE_ANSWER_FROM_QUESTION:
      const answerToRemove = action.payload;
      const remainingAnswers = state.question.answers.filter(
        a => a.id !== parseInt(answerToRemove.id)
      );
      return {
        ...state,
        question: {
          ...state.question,
          answers: remainingAnswers
        }
      };
    case EDIT_QUESTION_SUCCESS:
      const updatedAnswer = action.payload;
      const indexOfUpdated = state.questions.findIndex(
        q => q.id === parseInt(updatedAnswer.id)
      );
      const newQuestions = state.questions.slice();
      newQuestions[indexOfUpdated] = updatedAnswer;
      return {
        ...state,
        loading: false,
        questions: newQuestions
      };
    case REMOVE_QUESTION_SUCCESS:
      const questionToRemove = action.payload;
      const remainingQuestions = state.questions.filter(
        a => a.id !== parseInt(questionToRemove.id)
      );
      return {
        ...state,
        questions: remainingQuestions,
        loading: false
      };
    default:
      return state;
  }
}
