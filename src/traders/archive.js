import { writable } from 'svelte/store';
import { upsert } from "./util.js";
import { state, locations, remainingCargo, maxAfford } from './state.js';

export const archive = writable({});
export const planet = (symbol) => archive.planets.find(x => x.symbol === symbol);
export const unexploredLocations = () => locations().filter(location => !planet(location));
export const symbolMatch = (existing, incoming) => existing.symbol === incoming.symbol;

export function fillHold(shipId, good, creditReserve) {
  exports.space = remainingCargo(shipId);
  exports.price = maxAfford(good, creditReserve);
  return Math.min(space, price);
}

export function beginTrip() {
  archive.update(x => ({...x, startCredits: state.user.credits }));
}

export function endTrip() {
  archive.lastProfit = state.user.credits - archive.startCredits;
  archive.trips = (archive.trips || 0) + 1;
  archive.totalProfit = (archive.totalProfit || 0) + archive.lastProfit;
}

export function archiveLocations() {
  if (!state.locations) return;
  const locations = state.locations.reduce(upsert(symbolMatch), x.locations || []);
  archive.update(x => ({...x, locations }));
}

export function archivePlanet() {
  if (!state.planet) return;
  const planets = [state.planet].reduce(upsert(symbolMatch), x.planets || []);
  archive.update(x => ({...x, planets }));
}

export function saveArchive() {
  archiveLocations();
  archivePlanet();
}