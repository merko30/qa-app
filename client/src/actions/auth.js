import {
  LOGOUT,
  CLEAR_ERROR,
  SET_STATUS,
  CLEAR_MESSAGE
} from "../constants/auth";

import createAction from "../utils/createAction";
import history from "../config/history";
import { AuthService } from "../services/auth";

const registerAction = createAction("REGISTER");
const loginAction = createAction("LOGIN");
const getUserAction = createAction("GET_USER");
const sendResetAction = createAction("SEND_RESET_LINK");
const resetPasswordAction = createAction("RESET_PASSWORD");
const editAction = createAction("EDIT_USER");
const verifyAction = createAction("VERIFY_EMAIL");
const verifyChangeAction = createAction("VERIFY_EMAIL_CHANGE");
const changeEmailAction = createAction("CHANGE_EMAIL");

export const register = data => async dispatch => {
  dispatch(registerAction.start());
  try {
    const response = await AuthService.registerRequest(data);

    const jsonResponse = await response.json();
    if (response.ok) {
      dispatch(registerAction.success());
      dispatch(clearError());
      history.push("/login");
    } else {
      dispatch(registerAction.failure(jsonResponse));
    }
  } catch (error) {
    dispatch(registerAction.failure(error));
  }
};

export const login = data => async dispatch => {
  dispatch(loginAction.start());
  try {
    const response = await AuthService.loginRequest(data);
    const jsonResponse = await response.json();
    console.log(response);
    if (response.ok) {
      const { token, user } = jsonResponse;
      dispatch(loginAction.success());
      dispatch(clearError());
      dispatch(clearMessage());
      localStorage.setItem("token", token);
      localStorage.setItem("userId", parseInt(user.id));
      history.push("/");
    } else {
      dispatch(loginAction.failure(jsonResponse));
    }
  } catch (error) {
    dispatch(loginAction.failure(error));
  }
};

export const getUser = id => async dispatch => {
  dispatch(getUserAction.start());
  try {
    const { user } = await AuthService.getUserRequest(id);
    dispatch(getUserAction.success(user));
  } catch (error) {
    dispatch(getUserAction.failure(error));
  }
};

export const sendResetLink = email => async dispatch => {
  dispatch(sendResetAction.start());
  try {
    const { message } = await AuthService.sendResetEmailRequest(email);
    dispatch(sendResetAction.success(message));
  } catch (error) {
    dispatch(sendResetAction.failure(error));
  }
};

export const resetPassword = (token, data) => async dispatch => {
  dispatch(resetPasswordAction.start());
  try {
    const { message } = await AuthService.resetPasswordRequest(token, data);
    dispatch(resetPasswordAction.success(message));
    setTimeout(() => {
      history.push("/login");
    }, 500);
  } catch (error) {
    dispatch(resetPasswordAction.failure(error));
  }
};

export const editUser = data => async dispatch => {
  dispatch(editAction.start());
  try {
    const response = await AuthService.editUserRequest(data);
    const jsonResponse = await response.json();
    if (response.ok) {
      dispatch(editAction.success(jsonResponse.user));
      dispatch(clearError());
    } else {
      dispatch(editAction.failure(jsonResponse));
    }
  } catch (error) {
    dispatch(editAction.failure(error));
  }
};

export const changeAvatar = data => async dispatch => {
  dispatch(editAction.start());
  try {
    const response = await AuthService.changeAvatarRequest(data);
    const jsonResponse = await response.json();
    if (response.ok) {
      dispatch(editAction.success(jsonResponse.user));
      dispatch(clearError());
    } else {
      dispatch(editAction.failure(jsonResponse));
    }
  } catch (error) {
    dispatch(editAction.failure(error));
  }
};

export const verifyEmail = (token, email) => async dispatch => {
  dispatch(verifyAction.start());
  try {
    const response = await AuthService.verifyEmailRequest(token, email);
    const jsonResponse = await response.json();
    if (response.ok) {
      dispatch(verifyAction.success(jsonResponse.message));
      dispatch(clearError());
      history.push("/login");
    } else {
      dispatch(verifyAction.failure(jsonResponse));
    }
  } catch (error) {
    dispatch(verifyAction.failure(error));
  }
};

export const changeEmail = email => async dispatch => {
  dispatch(changeEmailAction.start());
  try {
    const response = await AuthService.changeEmailRequest(email);
    const jsonResponse = await response.json();
    if (response.ok) {
      dispatch(changeEmailAction.success(jsonResponse.message));
      dispatch(clearError());
    } else {
      dispatch(changeEmailAction.failure(jsonResponse));
    }
  } catch (error) {
    dispatch(verifyChangeAction.failure(error));
  }
};

export const verifyEmailChange = (token, email) => async dispatch => {
  dispatch(verifyChangeAction.start());
  try {
    const response = await AuthService.verifyEmailChangeRequest(token, email);
    const jsonResponse = await response.json();
    if (response.ok) {
      dispatch(verifyChangeAction.success(jsonResponse));
      dispatch(clearError());
      history.push("/profile");
    } else {
      dispatch(verifyChangeAction.failure(jsonResponse));
    }
  } catch (error) {
    dispatch(verifyChangeAction.failure(error));
  }
};

export const logout = () => dispatch => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
  history.push("/login");
};

export const clearError = () => dispatch => {
  dispatch({ type: CLEAR_ERROR });
};

export const clearMessage = () => dispatch => {
  dispatch({ type: CLEAR_MESSAGE });
};

export const setStatus = () => dispatch => {
  dispatch({ type: SET_STATUS });
};
