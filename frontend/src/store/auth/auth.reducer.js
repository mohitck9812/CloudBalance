import { LOGIN_SUCCESS, LOGOUT, LOAD_AUTH_FROM_STORAGE } from "./auth.types";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_AUTH_FROM_STORAGE: {
      const { user, token } = action.payload;

      return {
        ...state,
        user,
        token,
        isAuthenticated: Boolean(user && token),
        loading: false,
      };
    }

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case LOGOUT:
      return {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}

