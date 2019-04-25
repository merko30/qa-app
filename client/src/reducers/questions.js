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
  UPDATE_QUESTION_ANSWERS
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
    case FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      };
    case FETCH_QUESTION:
      return {
        ...state,
        loading: true
      };
    case FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        question: action.payload.question
      };
    case FETCH_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      };
    case ADD_QUESTION:
      return {
        ...state,
        loading: true
      };
    case ADD_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: [action.payload, ...state.questions]
      };
    case ADD_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      };
    case UPDATE_QUESTION_ANSWERS:
      return {
        ...state,
        question: {
          ...state.question,
          answers: [...state.question.answers, action.payload]
        }
      };
    default:
      return state;
  }
}
