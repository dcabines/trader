import {get, put, post } from './http.js';
import { state } from "./state.js";

const user = (path) => `/users/${state.user.username}/${path}`;
const game = (path) => `/game/${path}`;

export const getStatus = () => get(game('status'));
export const createToken = (username) => post(`/users/${username}/token`);
export const getUser = (username, token) => get(`/users/${username}`, token);

export const getLoans = (token) => get(game('loans'), token);
export const takeLoan = (type, token) => post(user('loans'), { type }, token);
export const payLoan = (loanId, token) => put(`${user('loans')}/${loanId}`, {}, token);

export const getShips = (token) => get(game('ships'), token);
export const buyShip = (location, type, token) => post(user('ships'), { location, type }, token);

export const getSystems = (token) => get(game('systems'), token);
export const getSystem = (system, token) => get(game(`systems/${system}`), token);
export const getLocations = (system, type, token) => get(game(`systems/${system}/locations?type=${type}`), token);
export const getLocation = (location, token) => get(game(`locations/${location}`), token);
export const getMarket = (location, token) => get(game(`locations/${location}/marketplace`), token);

export const createFlightPlan = (shipId, destination, token) => post(user('flight-plans'), { shipId, destination }, token);
export const getFlightPlan = (flightPlanId, token) => get(user(`flight-plans/${flightPlanId}`), token);

export const buyGood = (shipId, good, quantity, token) => post(user('purchase-orders'), { shipId, good, quantity: Math.trunc(quantity) }, token);
export const sellGood = (shipId, good, quantity, token) => post(user('sell-orders'), { shipId, good, quantity: Math.trunc(quantity) }, token);