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

import history from "../config/history";

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = () => ({ type: REGISTER_SUCCESS });
const registerFailure = error => ({ type: REGISTER_FAILURE, payload: error });

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = () => ({ type: LOGIN_SUCCESS });
const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error });

export const register = data => async dispatch => {
  dispatch(registerRequest());
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json"
      }
    });
    const jsonResponse = await response.json();
    if (response.ok) {
      dispatch(registerSuccess());
      dispatch(clearError());
      history.push("/login");
    } else {
      dispatch(registerFailure(jsonResponse));
    }
  } catch (error) {
    dispatch(registerFailure(error));
  }
};

export const login = data => async dispatch => {
  dispatch(loginRequest());
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json"
      }
    });
    const jsonResponse = await response.json();
    if (response.ok) {
      const { token, user } = jsonResponse;
      dispatch(loginSuccess());
      dispatch(clearError());
      localStorage.setItem("token", token);
      localStorage.setItem("userId", parseInt(user.id));
      history.push("/login");
    } else {
      dispatch(loginFailure(jsonResponse));
    }
  } catch (error) {
    dispatch(loginFailure(error));
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
