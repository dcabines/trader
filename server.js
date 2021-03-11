const root = 'https://api.spacetraders.io';
const fetch = require("node-fetch");
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000

express()
  .get('/state.json', (req, res) => res.json(state))
  .get('/archive.json', (req, res) => res.json(archive))
  .get('/start', (req, res) => {
    richMan();
    res.sendStatus(200);
  })
  .use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

// utils
const timeout = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));
const userName = () => `user-${new Date().getTime()}-${Math.random()}`;

const http = async(method, path, fetchBody, token) => {
  const body = fetchBody ? JSON.stringify(fetchBody) : null;

  const res = await fetch(`${root}${path}`, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  const json = await res.json();
  console.log('response', json);

  saveState(json);
  saveArchive();
  console.log('state', JSON.stringify(state));
  await timeout(1);
};

const get = (path, token) => http('GET', path, null, token);
const post = (path, body, token) => http('POST', path, body, token);
const put = (path, body, token) => http('PUT', path, body, token);

const upsert = (findKey) => (destination, incoming) => {
  const existing = destination.find(x => findKey(x, incoming));
  const others = destination.filter(x => x !== existing);
  const updated = {...existing, ...incoming };
  return [...others, updated];
};

// state
const state = {};
const saveState = (data) => Object.assign(state, data);

const system = () => state.systems[0];
const locations = () => system().locations;
const systemLocation = (symbol) => locations().find(x => x.symbol === symbol);
const marketItem = (symbol) => state.planet.marketplace.find(x => x.symbol === symbol);

const ship = (shipId) => state.user.ships.find(x => x.id === shipId);
const cargo = (shipId, good) => ship(shipId).cargo.find(x => x.good === good);
const cargoTotal = (shipId) => ship(shipId).cargo.reduce((p, c) => p + c.quantity, 0);
const remainingCargo = (shipId) => ship(shipId).maxCargo - cargoTotal(shipId);
const goodQuantity = (shipId, good) => cargo(shipId, good).quantity;

const maxAfford = (good, creditReserve) => {
  const credits = state.user.credits - creditReserve;
  const price = marketItem(good).pricePerUnit;
  return credits / price;
};

// archive
const archive = {};
const planet = (symbol) => archive.planets.find(x => x.symbol === symbol);
const unexploredLocations = () => locations().filter(location => !planet(location));
const symbolMatch = (existing, incoming) => existing.symbol === incoming.symbol;

const fillHold = (shipId, good, creditReserve) => {
  const space = remainingCargo(shipId);
  const price = maxAfford(good, creditReserve);
  return Math.min(space, price);
};

const beginTrip = () => {
  archive.startCredits = state.user.credits;
};

const endTrip = () => {
  archive.lastProfit = state.user.credits - archive.startCredits;
  archive.trips = (archive.trips || 0) + 1;
  archive.totalProfit = (archive.totalProfit || 0) + archive.lastProfit;
};

const archiveLocations = () => {
  if (!state.locations) return;
  archive.locations = state.locations.reduce(
    upsert(symbolMatch),
    archive.locations || []
  );
};

const archivePlanet = () => {
  if (!state.planet) return;
  archive.planets = [state.planet].reduce(
    upsert(symbolMatch),
    archive.planets || []
  );
};

const saveArchive = () => {
  archiveLocations();
  archivePlanet();
};

// report
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
const report = (data) => `${reportHeader}\n${prefixLines(data).join(`\n`)}\n${reportFooter}`;
const planetReport = (planet) => [`${planet.name}  ${planet.symbol}`, ...marketReport(planet.marketplace)];
const systemReport = () => [].concat(...archive.planets.sort(sortLocations).map(x => [...planetReport(x), '']));
const buyReport = (order) => `Bought ${order.quantity} ${order.good} for ${order.total} at ${order.pricePerUnit} each.`;
const sellReport = (order) => `Sold ${order.quantity} ${order.good} for ${order.total}.`;
const creditReport = () => `${state.user.credits} credits remaining.`;
const flightReport = () => `Flying to ${systemLocation(state.flightPlan.destination).name}.`;
const tripReport = () => `Completed trip number ${archive.trips}.`;
const profitReport = () => `${archive.lastProfit} profit.`
const totalProfitReport = () => `${archive.totalProfit} total profit.`;
const availableReport = (good) => `${good} is not available here.`;
const poorReport = (good, quantity) => `Cannot afford to buy ${quantity} of ${good}`;

// path
const user = (path) => `/users/${state.user.username}/${path}`;
const game = (path) => `/game/${path}`;

// api
const getStatus = () => get(game('status'));
const createToken = (username) => post(`/users/${username}/token`);
const getUser = (username, token) => get(`/users/${username}`, token);

const getLoans = (token) => get(game('loans'), token);
const takeLoan = (type, token) => post(user('loans'), { type }, token);
const payLoan = (loanId, token) => put(`${user('loans')}/${loanId}`, {}, token);

const getShips = (token) => get(game('ships'), token);
const buyShip = (location, type, token) => post(user('ships'), { location, type }, token);

const getSystems = (token) => get(game('systems'), token);
const getSystem = (system, token) => get(game(`systems/${system}`), token);
const getLocations = (system, type, token) => get(game(`systems/${system}/locations?type=${type}`), token);
const getLocation = (location, token) => get(game(`locations/${location}`), token);
const getMarket = (location, token) => get(game(`locations/${location}/marketplace`), token);

const createFlightPlan = (shipId, destination, token) => post(user('flight-plans'), { shipId, destination }, token);
const getFlightPlan = (flightPlanId, token) => get(user(`flight-plans/${flightPlanId}`), token);

const buyGood = (shipId, good, quantity, token) => post(user('purchase-orders'), { shipId, good, quantity: Math.trunc(quantity) }, token);
const sellGood = (shipId, good, quantity, token) => post(user('sell-orders'), { shipId, good, quantity: Math.trunc(quantity) }, token);

// actions
const getAccount = () => getUser(state.user.username, state.token);

const getMarkets = async () => {
  for (const ship of state.user.ships) {
    await getMarket(ship.location, state.token);
  }
};

const fly = async (shipId, destination) => {
  const myShip = ship(shipId);
  if (myShip.location === destination) return;

  await createFlightPlan(shipId, destination, state.token);
  await getAccount();
  console.log(flightReport());

  await timeout(state.flightPlan.timeRemainingInSeconds);
  await timeout(5); // docking
  await getMarket(destination, state.token);
  console.log(report(planetReport(state.planet)));
};

const buy = async (shipId, good, quantity) => {
  const item = marketItem(good);

  if (!item) {
    console.log(availableReport(good));
    return;
  }

  const canAfford = state.user.credits / item.pricePerUnit;
  const toBuy = Math.min(canAfford, item.quantityAvailable, quantity);

  if (isNaN(toBuy)) debugger;
  if (toBuy <= 0) return;
  await buyGood(shipId, good, toBuy, state.token);
  await getAccount();

  console.log(report([buyReport(state.order[0]), creditReport()]));
};

const sell = async (shipId, good, quantity) => {
  if (quantity <= 0) return;
  await sellGood(shipId, good, quantity, state.token);
  await getAccount();

  console.log(report([sellReport(state.order[0]), creditReport()]));
};

const refuel = async (shipId, wantedFuel) => {
  const cargoFuel = cargo(shipId, 'FUEL') || { quantity: 0 };
  const neededFuel = wantedFuel - cargoFuel.quantity;

  if (isNaN(neededFuel)) debugger;
  if (neededFuel <= 0) return;
  await buy(shipId, 'FUEL', neededFuel, state.token);
};

const logIn = async (options) => {
  if (options) {
    state.token = options.token;
    state.user = { username: options.username };
  }
  else {
    await createToken(userName());
  }

  await getAccount();
  await getSystems(state.token);
  console.log('Username', state.user.username);
};

const startup = async () => {
  await takeLoan('STARTUP', state.token);
  await buyShip('OE-NY', 'JW-MK-I', state.token);
  await getMarket('OE-NY', state.token);
  await refuel(state.user.ships[0].id, 30);
  console.log(report(planetReport(state.planet)));
};

const trade = async (options) => {
  while (true) {
    const location = ship(options.shipId).location;

    if (!location) {
      // await getAccount();
      // continue;
      return;
    }

    beginTrip();
    const inCargo = cargo(options.shipId, options.good);

    if (!inCargo) {
      await refuel(options.shipId, options.fuel);
      await fly(options.shipId, options.source);
      const toBuy = fillHold(options.shipId, options.good, options.creditReserve);
      await buy(options.shipId, options.good, toBuy);
    }

    await refuel(options.shipId, options.fuel);
    await fly(options.shipId, options.destination);
    const toSell = goodQuantity(options.shipId, options.good);
    await sell(options.shipId, options.good, toSell);

    endTrip();

    const reports = [
      tripReport(),
      profitReport(),
      totalProfitReport()
    ];

    console.log(report(reports));

    if (state.user.credits < 1000) {
      console.log('You\'re broke! Go home.');
      await timeout(4);
      return;
    }
  }
};

const explore = async (options) => {
  const symbols = unexploredLocations().map(x => x.symbol);

  for (let i = 0; i < symbols.length; i++) {
    await refuel(options.shipId, 100);
    await fly(options.shipId, symbols[i]);
  }

  console.log(report(systemReport()));
  console.log('Exploration complete.');
};

const richMan = async () => {
  await logIn({
    token: '212132e0-a388-4d74-a176-ff74c01e6f94',
    username: 'dcabines'
  });

  const myShip = ship('ckm2vc3vk16160214989jh86ygmm');

  if (myShip.location) {
    await getMarket(myShip.location, state.token);
  }

  await trade({
    good: 'METALS',
    source: 'OE-NY',
    destination: 'OE-PM',
    fuel: 30,
    creditReserve: 1000,
    shipId: 'ckm2vc3vk16160214989jh86ygmm'
  });
};

const richExplorer = async () => {
  await logIn({
    token: '212132e0-a388-4d74-a176-ff74c01e6f94',
    username: 'dcabines'
  });

  const myShip = ship('ckm2vc3vk16160214989jh86ygmm');

  if (myShip.location) {
    await getMarket(myShip.location);
  }

  await explore({
    shipId: myShip.id
  });
};

const poorMan = async () => {
  await logIn();
  await startup();

  await trade({
    good: 'METALS',
    source: 'OE-PM',
    destination: 'OE-NY',
    fuel: 30,
    creditReserve: 0,
    shipId: state.user.ships[0].id
  });

  await poorMan();
};

const explorer = async () => {
  await logIn();
  await startup();
  await explore({
    shipId: state.user.ships[0].id
  });
};