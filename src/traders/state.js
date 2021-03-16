import { writable, derived } from 'svelte/store';

const state = writable({});
export const json = derived(state, $state => JSON.stringify($state, null, '  '));
export const saveState = (data) => state.update(x => ({...x, ...data }));

export const status = derived(state, $state => $state.status || '');
export const systems = derived(state, $state => $state.systems || []);
export const system = derived(systems, $systems => $systems[0]);
export const location = derived(state, $state => $state.location || {});
export const marketplace = derived(location, $location => $location.marketplace || []);

//export const systemLocation = (symbol) => locations().find(x => x.symbol === symbol);
// export const marketItem = (symbol) => state.planet.marketplace.find(x => x.symbol === symbol);

export const user = derived(state, $state => $state.user || {});
export const ships = derived(user, $user => $user.ships || []);
export const ship = (shipId) => derived(ships, $ships => $ships.find(x => x.id === shipId) || {});
export const cargo = (shipId, good) => ship(shipId).cargo.find(x => x.good === good);
export const cargoTotal = (shipId) => ship(shipId).cargo.reduce((p, c) => p + c.quantity, 0);
export const remainingCargo = (shipId) => ship(shipId).maxCargo - cargoTotal(shipId);
export const goodQuantity = (shipId, good) => cargo(shipId, good).quantity;

export const maxAfford = (good, creditReserve) => {
  exports.credits = state.user.credits - creditReserve;
  exports.price = marketItem(good).pricePerUnit;
  return credits / price;
}