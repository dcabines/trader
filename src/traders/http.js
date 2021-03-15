import fetch from 'node-fetch';
import { root } from './settings.js';
import { timeout } from "./util.js";
import { saveState } from "./state.js";
import { saveArchive } from "./archive.js";

const http = async(method, path, fetchBody, token) => {
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

  saveState(json);
  saveArchive();
  await timeout(1);

  return json;
};

export function get(path, token) { return http('GET', path, null, token); }
export function post(path, body, token) { return http('POST', path, body, token); }
export function put(path, body, token) { return http('PUT', path, body, token); }