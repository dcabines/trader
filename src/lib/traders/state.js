import { writable, derived } from 'svelte/store';

const internal = writable({
  status: '',
  token: '98002005-e53b-4076-9e79-b8a84bff23ac',
  loggedIn: false,
  error: {},
  user: {
    username: 'temp-123-01',
    ships: []
  },
  ship: {},
  loans: [],
  systems: [],
  ships: [],
  location: {},
  flightPlan: {}
});

export const state = derived(internal, $state => ({...$state }));
export const loggedIn = derived(state, $state => Boolean($state.loggedIn));
export const saveState = (data) => internal.update(x => ({...x, ...data }));

export const status = derived(internal, $state => $state.status || '');
export const loans = derived(internal, $state => $state.loans || []);
export const systems = derived(internal, $state => $state.systems || []);
export const ships = derived(internal, $state => $state.ships || []);
export const system = derived(systems, $systems => $systems[0] || {});
export const location = derived(internal, $state => $state.location || {});
export const marketplace = derived(location, $location => $location.marketplace || []);

//export const systemLocation = (symbol) => locations().find(x => x.symbol === symbol);
// export const marketItem = (symbol) => state.planet.marketplace.find(x => x.symbol === symbol);

export const user = derived(internal, $state => $state.user || {});
export const userShips = derived(user, $user => $user.ships || []);
export const userLoans = derived(user, $user => $user.loans || []);
export const userShip = (shipId) => derived(userShips, $ships => $ships.find(x => x.id === shipId) || {});
export const cargo = (shipId, good) => userShip(shipId).cargo.find(x => x.good === good);
export const cargoTotal = (shipId) => userShip(shipId).cargo.reduce((p, c) => p + c.quantity, 0);
export const remainingCargo = (shipId) => userShip(shipId).maxCargo - cargoTotal(shipId);
export const goodQuantity = (shipId, good) => cargo(shipId, good).quantity;

export const maxAfford = (good, creditReserve) => {
  exports.credits = internal.user.credits - creditReserve;
  exports.price = marketItem(good).pricePerUnit;
  return credits / price;
};