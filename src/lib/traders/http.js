import { root } from './settings.js';

export const authorization = {
  username: '',
  token: ''
};

const userPath = () => `/users/${authorization.username}`;

const http = async(method, path, fetchBody) => {
  const body = fetchBody ? JSON.stringify(fetchBody) : null;

  const res = await fetch(`${root}${path}`, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authorization.token}`
    },
  });

  return await res.json();
};

export const get = (path) => http('GET', path, null);
export const post = (path, body) => http('POST', path, body);
export const put = (path, body) => http('PUT', path, body);

const addUserPath = (path) => {
  const parts = [userPath(), path];
  const combined = parts.filter(Boolean).join('/');
  return combined;
};

export const userGet = (path) => get(addUserPath(path));
export const userPost = (path, body) => post(addUserPath(path), body);
export const userPut = (path, body) => put(addUserPath(path), body);