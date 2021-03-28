import * as api from '$lib/traders/api';
import { saveState } from '$lib/traders/state';

export const logIn = (username, token) => {
  saveState({
    token,
    loggedIn: true,
    user: {
      username,
      ships: []
    }
  });

  api.getUser();
};



// import { timeout, userName } from './util.js';
// import { getUser, getSystems, takeLoan, getMarket, createFlightPlan } from './api.js';
// import { ships, cargo, marketItem } from './state.js';
// import { beginTrip, endTrip } from "./archive.js";
// import { availableReport, buyReport, creditReport, sellReport } from './report.js';

// export const getAccount = () => getUser(state.user.username, state.token);

// export async function getMarkets() {
//   for (const ship of state.user.ships) {
//     await getMarket(ship.location, state.token);
//   }
// }

// export async function fly(shipId, destination) {
//   const myShip = ship(shipId);
//   if (myShip.location === destination) return;

//   await createFlightPlan(shipId, destination, state.token);
//   await getAccount();
//   // console.log(flightReport());

//   await timeout(state.flightPlan.timeRemainingInSeconds);
//   await timeout(5); // docking
//   await getMarket(destination, state.token);
//   console.log(report(planetReport(state.planet)));
// }

// export async function buy(shipId, good, quantity) {
//   const item = marketItem(good);

//   if (!item) {
//     console.log(availableReport(good));
//     return;
//   }

//   const canAfford = state.user.credits / item.pricePerUnit;
//   const toBuy = Math.min(canAfford, item.quantityAvailable, quantity);

//   if (isNaN(toBuy)) debugger;
//   if (toBuy <= 0) return;
//   await buyGood(shipId, good, toBuy, state.token);
//   await getAccount();

//   console.log(report([buyReport(state.order[0]), creditReport()]));
// }

// export async function sell(shipId, good, quantity) {
//   if (quantity <= 0) return;
//   await sellGood(shipId, good, quantity, state.token);
//   await getAccount();

//   console.log(report([sellReport(state.order[0]), creditReport()]));
// }

// export async function refuel(shipId, wantedFuel) {
//   const cargoFuel = cargo(shipId, 'FUEL') || { quantity: 0 };
//   const neededFuel = wantedFuel - cargoFuel.quantity;

//   if (isNaN(neededFuel)) debugger;
//   if (neededFuel <= 0) return;
//   await buy(shipId, 'FUEL', neededFuel, state.token);
// }

// export async function logIn(options) {
//   if (options) {
//     state.token = options.token;
//     state.user = { username: options.username };
//   } else {
//     await createToken(userName());
//   }

//   await getAccount();
//   await getSystems(state.token);
//   console.log('Username', state.user.username);
// }

// export async function startup() {
//   await takeLoan('STARTUP', state.token);
//   await buyShip('OE-NY', 'JW-MK-I', state.token);
//   await getMarket('OE-NY', state.token);
//   await refuel(state.user.ships[0].id, 30);
//   console.log(report(planetReport(state.planet)));
// }

// export async function trade(options) {
//   while (true) {
//     const location = ship(options.shipId).location;

//     if (!location) {
//       await getAccount();
//       continue;
//     }

//     beginTrip();
//     const inCargo = cargo(options.shipId, options.good);

//     if (!inCargo) {
//       await refuel(options.shipId, options.fuel);
//       await fly(options.shipId, options.source);
//       const toBuy = fillHold(options.shipId, options.good, options.creditReserve);
//       await buy(options.shipId, options.good, toBuy);
//     }

//     await refuel(options.shipId, options.fuel);
//     await fly(options.shipId, options.destination);
//     const toSell = goodQuantity(options.shipId, options.good);
//     await sell(options.shipId, options.good, toSell);

//     endTrip();

//     const reports = [
//       tripReport(),
//       profitReport(),
//       totalProfitReport()
//     ];

//     console.log(report(reports));

//     if (state.user.credits < 1000) {
//       console.log('You\'re broke! Go home.');
//       await timeout(4);
//       return;
//     }
//   }
// }

// export async function explore(options) {
//   const symbols = unexploredLocations().map(x => x.symbol);

//   for (let i = 0; i < symbols.length; i++) {
//     await refuel(options.shipId, 100);
//     await fly(options.shipId, symbols[i]);
//   }

//   console.log(report(systemReport()));
//   console.log('Exploration complete.');
// }