import * as api from '$lib/traders/api';
import { authorization } from '$lib/traders/http';

export const logIn = (update) => (username, token) => {
  update(state => ({...state, loggedIn: true, token }));

  authorization.token = token;
  authorization.username = username;

  api.getUser();
};