import {
  LOGIN_SUCCESS,
  LOGOUT,
  LOAD_AUTH_FROM_STORAGE,
} from "./auth.types";

import { setToken, removeToken } from "../../util/Utils";

// Called after successful login
export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token },
});

export const loadAuthFromStorage = () => (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const userRaw = localStorage.getItem("authUser");

    const user = userRaw ? JSON.parse(userRaw) : null;

    dispatch({
      type: LOAD_AUTH_FROM_STORAGE,
      payload: { user, token },
    });
  } catch (e) {
    dispatch({
      type: LOAD_AUTH_FROM_STORAGE,
      payload: { user: null, token: null },
    });
  }
};


// Logout action
export const logout = () => (dispatch) => {
  removeToken();
  localStorage.removeItem("authUser");

  dispatch({ type: LOGOUT });
};
