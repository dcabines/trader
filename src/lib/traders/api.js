import {get, post, userGet, userPost, userPut } from './http.js';

export const getStatus = () => get('/game/status');
export const getLoans = () => get('/game/loans');
export const getShips = () => get('/game/ships');
export const getSystems = () => get('/game/systems');
export const getSystem = (system) => get(`/game/systems/${system}`);
export const getLocations = (system, type) => get(`/game/systems/${system}/locations?type=${type}`);
export const getLocation = (location) => get(`/game/locations/${location}`);
export const getMarket = (location) => get(`/game/locations/${location}/marketplace`);
export const flightPlans = () => get('/game/systems/OE/flight-plans');

export const createToken = (username) => post(`/users/${username}/token`);

export const getUser = () => userGet();
export const takeLoan = (type) => userPost('loans', { type });
export const payLoan = (loanId) => userPut(`loans/${loanId}`, {});
export const buyShip = (location, type) => userPost('ships', { location, type });
export const sellShip = (type) => userGet(); // TODO
export const createFlightPlan = (shipId, destination) => userPost('flight-plans', { shipId, destination });
export const getFlightPlan = (flightPlanId) => userGet(`flight-plans/${flightPlanId}`);
export const buyGood = (shipId, good, quantity) => userPost('purchase-orders', { shipId, good, quantity: Math.trunc(quantity) });
export const sellGood = (shipId, good, quantity) => userPost('sell-orders', { shipId, good, quantity: Math.trunc(quantity) });