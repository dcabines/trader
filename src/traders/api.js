import {get, put, post } from './http.js';
import { state } from "./state.js";

const user = (path) => `/users/${state.user.username}/${path}`;
const game = (path) => `/game/${path}`;

export function getStatus() { return get(game('status')); }
export function createToken(username) { return post(`/users/${username}/token`); }
export function getUser(username, token) { return get(`/users/${username}`, token); }

export function getLoans(token) { return get(game('loans'), token); }
export function takeLoan(type, token) { return post(user('loans'), { type }, token); }
export function payLoan(loanId, token) { return put(`${user('loans')}/${loanId}`, {}, token); }

export function getShips(token) { return get(game('ships'), token); }
export function buyShip(location, type, token) { return post(user('ships'), { location, type }, token); }

export function getSystems(token) { return get(game('systems'), token); }
export function getSystem(system, token) { return get(game(`systems/${system}`), token); }
export function getLocations(system, type, token) { return get(game(`systems/${system}/locations?type=${type}`), token); }
export function getLocation(location, token) { return get(game(`locations/${location}`), token); }
export function getMarket(location, token) { return get(game(`locations/${location}/marketplace`), token); }

export function createFlightPlan(shipId, destination, token) { return post(user('flight-plans'), { shipId, destination }, token); }
export function getFlightPlan(flightPlanId, token) { return get(user(`flight-plans/${flightPlanId}`), token); }

export function buyGood(shipId, good, quantity, token) { return post(user('purchase-orders'), { shipId, good, quantity: Math.trunc(quantity) }, token); }
export function sellGood(shipId, good, quantity, token) { return post(user('sell-orders'), { shipId, good, quantity: Math.trunc(quantity) }, token); }