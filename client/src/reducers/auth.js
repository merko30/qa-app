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
  EDIT_USER_SUCCESS,
  VERIFY_EMAIL,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_CHANGE,
  VERIFY_EMAIL_CHANGE_FAILURE,
  VERIFY_EMAIL_CHANGE_SUCCESS,
  CHANGE_EMAIL,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD
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
    case VERIFY_EMAIL:
    case VERIFY_EMAIL_CHANGE:
    case CHANGE_EMAIL:
    case DELETE_USER:
    case CHANGE_PASSWORD:
      return {
        ...state,
        loading: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case SEND_RESET_LINK_FAILURE:
    case RESET_PASSWORD_FAILURE:
    case EDIT_USER_FAILURE:
    case VERIFY_EMAIL_FAILURE:
    case VERIFY_EMAIL_CHANGE_FAILURE:
    case CHANGE_EMAIL_FAILURE:
    case DELETE_USER_FAILURE:
    case CHANGE_PASSWORD_FAILURE:
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
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        user: null,
        loading: false,
        loggedIn: false
      };
    case SEND_RESET_LINK_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
    case VERIFY_EMAIL_SUCCESS:
    case CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false
      };
    case VERIFY_EMAIL_CHANGE_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        user: action.payload.user,
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
