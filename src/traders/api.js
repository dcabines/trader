import { get, put, post } from './http.js';

let username = null;
let token = null;
let shipId = null;

export const logIn = (creds) => {
  username = creds.username;
  token = creds.token;
  shipId = creds.shipId;
  getUser();
};

export const getStatus = () => get('/game/status');
export const createToken = (username) => post(`/users/${username}/token`);
export const getUser = () => get(`/users/${username}`, token);
export const getLoans = () => get('/game/loans', token);
export const takeLoan = (type) => post(`/users/${username}/loans`, { type }, token);
export const payLoan = (loanId) => put(`/users/${username}/loans/${loanId}`, {}, token);
export const getShips = () => get('/game/ships', token);
export const buyShip = (location, type) => post(`/users/${username}/ships`, { location, type }, token);
export const getSystems = () => get('/game/systems', token);
export const getSystem = (system) => get(`/game/systems/${system}`, token);
export const getLocations = (system, type) => get(`/game/systems/${system}/locations?type=${type}`, token);
export const getLocation = (location) => get(`/game/locations/${location}`, token);
export const getMarket = (location) => get(`/game/locations/${location}/marketplace`, token);
export const createFlightPlan = (destination) => post(`/users/${username}/flight-plans`, { shipId, destination }, token);
export const getFlightPlan = (flightPlanId) => get(`/users/${username}/flight-plans/${flightPlanId}`, token);
export const buyGood = (good, quantity) => post(`/users/${username}/purchase-orders`, { shipId, good, quantity: Math.trunc(quantity) }, token);
export const sellGood = (good, quantity) => post(`/users/${username}/sell-orders`, { shipId, good, quantity: Math.trunc(quantity) }, token);
