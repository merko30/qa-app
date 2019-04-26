import { LOGOUT, CLEAR_ERROR, SET_STATUS } from "../constants/auth";

import createAction from "../utils/createAction";
import history from "../config/history";
import { AuthService } from "../services/auth";

const registerAction = createAction("REGISTER");
const loginAction = createAction("LOGIN");

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
      dispatch(registerAction.success(jsonResponse));
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
      localStorage.setItem("token", token);
      localStorage.setItem("userId", parseInt(user.id));
      history.push("/login");
    } else {
      dispatch(loginAction.failure(jsonResponse));
    }
  } catch (error) {
    dispatch(loginAction.failure(error));
  }
};

export const logout = () => dispatch => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
};

export const clearError = () => dispatch => {
  dispatch({ type: CLEAR_ERROR });
};

export const setStatus = () => dispatch => {
  dispatch({ type: SET_STATUS });
};
