import {
  AUTH_ERR_LOG_IN,
  AUTH_ERR_LOG_OUT,
  AUTH_LOGGED_IN,
  AUTH_LOGGING_IN,
  AUTH_LOGGING_OUT,
  AUTH_LOGOUT,
  AUTH_SIGNED_UP,
  AUTH_SIGNING_UP,
  AUTH_ERR_SIGNUP
} from "../constants/auth";

import { toastr } from "../services/navRef";
import { userService } from "../services/userService";
import { teltonika } from "./teltonika";

export const loggingIn = (loggingIn) => ({
  type: AUTH_LOGGING_IN,
  payload: loggingIn
});

export const loggedIn = (data) => ({
  type: AUTH_LOGGED_IN,
  payload: data,
});

export const errorLogIn = (errorMessage) => ({
  type: AUTH_ERR_LOG_IN,
  payload: errorMessage,
});

export const login = (username, password, navigate) => (dispatch) => {
  dispatch(loggingIn(true));
  userService.login(username, password).then(async (res) => {
    console.log(res.data);
    await dispatch(loggedIn(res.data));
    await dispatch(teltonika(res.data.token, res.data.user.id));
    await navigate.navigate('MainBoard');
    console.log("login")
    toastr('Login Succeed!');
  }).catch(error => {
    if (error.response) {
      // Handle error with HTTP status code
      //console.error(error.response.data);
      toastr('username or password is incorrect');
    } else if (error.request) {
      // Handle error connecting to server
      //console.error('Error connecting to server:', error.request);
      toastr('Error connecting to server.');
    } else {
      // Handle other errors
      //console.error('Error:', error.message);
      toastr('Error:', error.message);
    }
    dispatch(errorLogIn('Wrong username or password'));

  }).finally(() => {
      dispatch(loggingIn(false));
    }
  )
};

export const loggedOut = () => ({
  type: AUTH_LOGOUT,
});

export const loggingOut = (lOut) => ({
  type: AUTH_LOGGING_OUT,
  payload: lOut,
});

export const errorLogOut = (errorMessage) => ({
  type: AUTH_ERR_LOG_OUT,
  payload: errorMessage,
});

export const logout = () => async (dispatch, getState) => {
  dispatch(loggingOut(true));
  await userService.logout(getState).then((res) => {
    dispatch(loggedOut());
  }).catch((err) => {
    dispatch(errorLogOut('Error logging out.'));
  }).finally(() => {
    dispatch(loggingOut(false));
  });
};


export const signup = (username, email, phone, password, navigate) => (dispatch) => {
  dispatch(signingUp(true));
  userService.signup(username, email, phone, password).then(async (res) => {
    console.log("sign up::::", res.data)
    await dispatch(signedUp(res.data));
    await navigate.navigate('LoginBoard');
    toastr('Sign up Succeed!');
  }).catch((error) => {
    if (error.response) {
      // Handle error with HTTP status code
      console.error(error.response.data);
      toastr('SignUp Failed!');
    } else if (error.request) {
      // Handle error connecting to server
      //console.error('Error connecting to server:', error.request);
      toastr('Error connecting to server.');
    } else {
      // Handle other errors
      //console.error('Error:', error.message);
      toastr('Error:', error.message);
    }
    dispatch(errorSignUp('SignUp Failed!'));
  }).finally(() => {
    dispatch(signingUp(false));
  });
};

export const signingUp = (signingUp) => ({
  type: AUTH_SIGNING_UP,
  payload: signingUp
});

export const signedUp = (data) => ({
  type: AUTH_SIGNED_UP,
  payload: data,
});

export const errorSignUp = (errorMessage) => ({
  type: AUTH_ERR_SIGNUP,
  payload: errorMessage,
});