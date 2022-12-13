import axios from "axios";


export const signupSuccess = () => {
  return { type: "signup_SUCCESS" };
};
export const signupFailure = (error) => {
  return {
    type: "SIGNUP_FAILURE",
    payload: error,
  };
};
export const loginSuccess = (user) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: user,
  };
};
export const getUsers = (users) => {
  return {
    type: "GET_USERS",
    payload: users,
  };
};
export const getUser = (user) => {
  return {
    type: "GET_USER",
    payload: user,
  };
};
export const loginFailure = (error) => {
  window.localStorage.removeItem("LoginTime");
  return {
    type: "LOGIN_FAILURE",
    payload: error,
  };
};
export const logoutSuccess = () => {
  window.localStorage.removeItem("LoginTime");
  return {
    type: "LOGOUT_SUCCESS",
  };
};
export const forgotPasswordSuccess = () => {
  return {
    type: "FORGOT_PASSWORD_SUCCESS",
  };
};
export const forgotPasswordFailure = (error) => {
  return {
    type: "FORGOT_PASSWORD_FAILURE",
    payload: error,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users`)
      .then((response) => {
        dispatch(getUsers(response.data));
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
};

export const fetchUser = (email) => {


  return (dispatch) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users`)
      .then((response) => {
        dispatch(getUser(response.data.find((user) => user.email === email)));
      })
      .catch((error) => error.message);
  };
};
