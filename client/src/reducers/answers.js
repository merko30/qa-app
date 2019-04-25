import {
  ADD_ANSWER_SUCCESS,
  ADD_ANSWER,
  ADD_ANSWER_FAILURE
} from "../constants/answers";

const initialState = {
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ANSWER:
      return {
        ...state,
        loading: true
      };
    case ADD_ANSWER_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case ADD_ANSWER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      };
    default:
      return state;
  }
}
