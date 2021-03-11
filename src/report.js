import { state, systemLocation } from "./state.js";
import { archive } from "./archive.js";

const reportHeader = '/*\\';
const linePrefix = '|*|';
const reportFooter = '\\*/';
const takeLongest = (p, c) => c.length > p ? c.length : p;
const longestKey = (array, keyPicker) => array.map(keyPicker).reduce(takeLongest, 0);
const sortLocations = (a, b) => a.name < b.name ? -1 : 1;
const sortMarket = (a, b) => a.symbol < b.symbol ? -1 : 1;
const marketLine = (item) => `${item.symbol}  ${item.pricePerUnit}  ${item.quantityAvailable}`;

const marketReport = (marketplace) => {
  const header = {
    symbol: 'name',
    pricePerUnit: 'price',
    quantityAvailable: 'available'
  };

  const marketplaceWithHeader = [header, ...marketplace];
  const longestSymbol = longestKey(marketplaceWithHeader, x => x.symbol);
  const longestPrice = longestKey(marketplaceWithHeader, x => x.pricePerUnit.toString());
  const longestAvailable = longestKey(marketplaceWithHeader, x => x.quantityAvailable.toString());

  const lineData = (item) => ({
    symbol: item.symbol.padEnd(longestSymbol, ' '),
    pricePerUnit: item.pricePerUnit.toString().padStart(longestPrice, ' '),
    quantityAvailable: item.quantityAvailable.toString().padStart(longestAvailable, ' ')
  });

  return [header, ...marketplace.sort(sortMarket)].map(lineData).map(marketLine);
};

const prefixLines = (data) => data.map(x => `${linePrefix} ${x}`);

export const report = (data) => `${reportHeader}\n${prefixLines(data).join(`\n`)}\n${reportFooter}`;
export const planetReport = (planet) => [`${planet.name}  ${planet.symbol}`, ...marketReport(planet.marketplace)];
export function systemReport() { return [].concat(...archive.planets.sort(sortLocations).map(x => [...planetReport(x), ''])); }
export function buyReport(order) { return `Bought ${order.quantity} ${order.good} for ${order.total} at ${order.pricePerUnit} each.`; }
export function sellReport(order) { return `Sold ${order.quantity} ${order.good} for ${order.total}.`; }
export function creditReport() { return `${state.user.credits} credits remaining.`; }
export function flightReport() { return `Flying to ${systemLocation(state.flightPlan.destination).name}.`; }
export function tripReport() { return `Completed trip number ${archive.trips}.`; }
export function profitReport() { return `${archive.lastProfit} profit.`; }
export function totalProfitReport() { return `${archive.totalProfit} total profit.`; }
export function availableReport(good) { return `${good} is not available here.`; }
export function poorReport(good, quantity) { return `Cannot afford to buy ${quantity} of ${good}`; }