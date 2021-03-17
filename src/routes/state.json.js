import {get as sget } from 'svelte/store';
import { state } from '../traders/state';

export async function get(req, res, next) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  const json = JSON.stringify(sget(state));

  res.end(json);
}