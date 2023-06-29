import axios from 'axios';
import { AUTH_URL } from '../constants/url';
import {resetAuthAsyncStorage, setAuthAsyncStorage} from "./getAuthAsyncStorage";

function login(username, password) {
  return new Promise((resolve, reject) => {
    axios.post(`${AUTH_URL}/login`, {
      email: username,
      password,
    }).then(async (response) => {
      try {
        await setAuthAsyncStorage(response);
        resolve(response);
      }
      catch (e) 
      {
        reject(e) 
      }
    }).catch((err) => {
      reject(err)
    });
  });
}

function signup(username, email, phone, password) {
  return new Promise((resolve, reject) => {
    axios.post(`${AUTH_URL}/signup`, {
      name: username,
      password,
      email,
      phone
    }).then(async (response) => {
      try {
        await setAuthAsyncStorage(response);
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

async function logout(getState) {
  return new Promise((resolve, reject) => {
    const currentState = getState();
    const { token } = currentState.auth;
    axios.get(`${AUTH_URL}/logout`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      resolve(response);
      await resetAuthAsyncStorage();
    }).catch((err) => reject(err));
  });
}

export const userService = {
  login,
  logout,
  signup
};
