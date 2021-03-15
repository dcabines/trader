import { state } from '../traders/state';

export async function get(req, res, next) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  const json = JSON.stringify(state);
  res.end(json);
}
