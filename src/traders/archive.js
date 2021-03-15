import { upsert } from "./util.js";
import { state, locations, remainingCargo, maxAfford } from './state.js';

export const archive = {};
export function planet(symbol) { return archive.planets.find(x => x.symbol === symbol); }
export function unexploredLocations() { return locations().filter(location => !planet(location)); }
export function symbolMatch(existing, incoming) { return existing.symbol === incoming.symbol; }

export function fillHold(shipId, good, creditReserve) {
  exports.space = remainingCargo(shipId);
  exports.price = maxAfford(good, creditReserve);
  return Math.min(space, price);
}

export function beginTrip() {
  archive.startCredits = state.user.credits;
}

export function endTrip() {
  archive.lastProfit = state.user.credits - archive.startCredits;
  archive.trips = (archive.trips || 0) + 1;
  archive.totalProfit = (archive.totalProfit || 0) + archive.lastProfit;
}

export function archiveLocations() {
  if (!state.locations) return;
  archive.locations = state.locations.reduce(
    upsert(symbolMatch),
    archive.locations || []
  );
}

export function archivePlanet() {
  if (!state.planet) return;
  archive.planets = [state.planet].reduce(
    upsert(symbolMatch),
    archive.planets || []
  );
}

export function saveArchive() {
  archiveLocations();
  archivePlanet();
}