import { json } from '../traders/state';

export async function get(req, res, next) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(json);
}
