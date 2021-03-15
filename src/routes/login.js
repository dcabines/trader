import { logIn } from '../traders/actions';

export async function get(req, res, next) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  logIn({
    username: 'temp-123',
    token: 'f679f118-621c-49a6-af70-27f616f8d9c5'
  });

  res.end();
}
