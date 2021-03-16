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

export const get = (path, token) => http('GET', path, null, token);
export const post = (path, body, token) => http('POST', path, body, token);
export const put = (path, body, token) => http('PUT', path, body, token);