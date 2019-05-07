import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CLEAR_ERROR,
  SET_STATUS,
  GET_USER,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  SEND_RESET_LINK,
  SEND_RESET_LINK_SUCCESS,
  SEND_RESET_LINK_FAILURE,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  CLEAR_MESSAGE,
  EDIT_USER,
  EDIT_USER_FAILURE,
  EDIT_USER_SUCCESS
} from "../constants/auth";

const initialState = {
  loggedIn: false,
  loading: false,
  error: null,
  user: null,
  message: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
    case GET_USER:
    case SEND_RESET_LINK:
    case RESET_PASSWORD:
    case EDIT_USER:
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
    case GET_USER_FAILURE:
    case SEND_RESET_LINK_FAILURE:
    case RESET_PASSWORD_FAILURE:
    case EDIT_USER_FAILURE:
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
    case GET_USER_SUCCESS:
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case SEND_RESET_LINK_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: null
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null
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
