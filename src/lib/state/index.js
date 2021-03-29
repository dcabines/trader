import { writable } from 'svelte/store';
import { logIn } from './account';
import { getLoans, takeLoan, payLoan } from './loan';
import { buyGood, getMarket, sellGood } from './market';
import { buyShip, fly, getShips } from './ship';
import { getStatus } from './status';
import { getSystems } from './system';
import { createToken } from './token';

const initialState = {
  status: '',
  token: '98002005-e53b-4076-9e79-b8a84bff23ac',
  loggedIn: false,
  error: {},
  user: {
    username: 'temp-123-01',
    ships: [],
    loans: []
  },
  ship: {},
  loans: [],
  systems: [],
  ships: [],
  location: {},
  locations: [],
  flightPlan: {},
};

const { update, subscribe } = writable(initialState);
const clearError = () => update(state => ({...state, error: {} }));

export default {
  subscribe,
  clearError,
  getStatus: getStatus(update),
  getSystems: getSystems(update),
  createToken: createToken(update),
  logIn: logIn(update),
  getLoans: getLoans(update),
  takeLoan: takeLoan(update),
  payLoan: payLoan(update),
  getShips: getShips(update),
  buyShip: buyShip(update),
  getMarket: getMarket(update),
  buyGood: buyGood(update),
  sellGood: sellGood(update),
  fly: fly(update)
};