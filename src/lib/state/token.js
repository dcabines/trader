import * as api from '$lib/traders/api';
import { authorization } from '$lib/traders/http';

export const createToken = (update) => async(username) => {
  const { token, user, error } = await api.createToken(username);

  if (error) {
    update(state => ({...state, error }));
    return;
  }

  authorization.token = token;
  authorization.username = user.username;

  update(state => ({...state, loggedIn: true, token, user }));
};