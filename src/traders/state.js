export const state = {};
export function saveState(data) { return Object.assign(state, data); }

export function system() { return state.systems[0]; }
export function locations() { return system().locations; }
export function systemLocation(symbol) { return locations().find(x => x.symbol === symbol); }
export function marketItem(symbol) { return state.planet.marketplace.find(x => x.symbol === symbol); }

export function ship(shipId) { return state.user.ships.find(x => x.id === shipId); }
export function cargo(shipId, good) { return ship(shipId).cargo.find(x => x.good === good); }
export function cargoTotal(shipId) { return ship(shipId).cargo.reduce((p, c) => p + c.quantity, 0); }
export function remainingCargo(shipId) { return ship(shipId).maxCargo - cargoTotal(shipId); }
export function goodQuantity(shipId, good) { return cargo(shipId, good).quantity; }

export function maxAfford(good, creditReserve) {
  exports.credits = state.user.credits - creditReserve;
  exports.price = marketItem(good).pricePerUnit;
  return credits / price;
}