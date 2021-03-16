import { writable, derived } from 'svelte/store';

export const state = writable({});
export const json = derived(state, $state => JSON.stringify($state, null, '  '));
export const saveState = data => state.update(x => ({...x, ...data }));

export const system = () => state.systems[0];
export const locations = () => system().locations;

export const systemLocation = (symbol) => locations().find(x => x.symbol === symbol);
export const marketItem = (symbol) => state.planet.marketplace.find(x => x.symbol === symbol);

export const ship = (shipId) => state.user.ships.find(x => x.id === shipId);
export const cargo = (shipId, good) => ship(shipId).cargo.find(x => x.good === good);
export const cargoTotal = (shipId) => ship(shipId).cargo.reduce((p, c) => p + c.quantity, 0);
export const remainingCargo = (shipId) => ship(shipId).maxCargo - cargoTotal(shipId);
export const goodQuantity = (shipId, good) => cargo(shipId, good).quantity;

export const maxAfford = (good, creditReserve) => {
  exports.credits = state.user.credits - creditReserve;
  exports.price = marketItem(good).pricePerUnit;
  return credits / price;
}