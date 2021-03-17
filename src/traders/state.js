import { writable, derived } from 'svelte/store';

const internal = writable({});

export const state = derived(internal, $state => ({...$state }));
export const error = derived(internal, $state => $state.error);
export const saveState = (data) => internal.update(x => ({...x, ...data }));

export const status = derived(internal, $state => $state.status || '');
export const systems = derived(internal, $state => $state.systems || []);
export const system = derived(systems, $systems => $systems[0] || {});
export const location = derived(internal, $state => $state.location || {});
export const marketplace = derived(location, $location => $location.marketplace || []);

//export const systemLocation = (symbol) => locations().find(x => x.symbol === symbol);
// export const marketItem = (symbol) => state.planet.marketplace.find(x => x.symbol === symbol);

export const user = derived(internal, $state => $state.user || {});
export const ships = derived(user, $user => $user.ships || []);
export const ship = (shipId) => derived(ships, $ships => $ships.find(x => x.id === shipId) || {});
export const cargo = (shipId, good) => ship(shipId).cargo.find(x => x.good === good);
export const cargoTotal = (shipId) => ship(shipId).cargo.reduce((p, c) => p + c.quantity, 0);
export const remainingCargo = (shipId) => ship(shipId).maxCargo - cargoTotal(shipId);
export const goodQuantity = (shipId, good) => cargo(shipId, good).quantity;

export const maxAfford = (good, creditReserve) => {
  exports.credits = internal.user.credits - creditReserve;
  exports.price = marketItem(good).pricePerUnit;
  return credits / price;
}