import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CLEAR_ERROR,
  SET_STATUS
} from "../constants/auth";

const initialState = {
  loggedIn: false,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    case SET_STATUS:
      return {
        ...state,
        loggedIn: true
      };
    default:
      return state;
  }
}
