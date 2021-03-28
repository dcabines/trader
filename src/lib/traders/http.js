import {get as getStore, derived } from 'svelte/store';
import { root } from './settings.js';
import { timeout } from "./util.js";
import { state, saveState } from "./state.js";
import { saveArchive } from "./archive.js";

const userPath = derived(state, $state => `/users/${$state.user.username}`);

const http = async(method, path, fetchBody) => {
  const current = getStore(state);
  const token = current.token;
  const body = fetchBody ? JSON.stringify(fetchBody) : null;

  const res = await fetch(`${root}${path}`, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  const json = await res.json();
  // await timeout(1);

  saveState(json);
  saveArchive();

  return json;
};

export const get = (path) => http('GET', path, null);
export const post = (path, body) => http('POST', path, body);
export const put = (path, body) => http('PUT', path, body);

const addUserPath = (path) => {
  const parts = [getStore(userPath), path];
  const combined = parts.filter(Boolean).join('/');
  return combined;
};

export const userGet = (path) => get(addUserPath(path));
export const userPost = (path, body) => post(addUserPath(path), body);
export const userPut = (path, body) => put(addUserPath(path), body);