const initialState = { error: null, isLoggedIn: null, userExist: null, users: null, user: null };

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "GET_USER":
      return { ...state, user: action.payload };
    case "REGISTERATION_SUCCESS":
    case "LOGOUT_SUCCESS":
    case "FORGOT_PASSWORD_SUCCESS":
      return { ...state, isLoggedIn: null, users: null, user: null, userExist: action.payload };
    case "LOGIN_SUCCESS":
      return { ...state, isLoggedIn: action.payload, userExist: true };
    case "REGISTERATION_FAILURE":
    case "LOGIN_FAILURE":
    case "FORGOT_PASSWORD_FAILURE":
    case "LOGOUT_FAILURE":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
