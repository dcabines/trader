/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/***/ ((module, exports) => {



// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
if (global.fetch) {
	exports.default = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;

/***/ }),

/***/ "./src/actions.js":
/*!************************!*\
  !*** ./src/actions.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAccount": () => (/* binding */ getAccount),
/* harmony export */   "getMarkets": () => (/* binding */ getMarkets),
/* harmony export */   "fly": () => (/* binding */ fly),
/* harmony export */   "buy": () => (/* binding */ buy),
/* harmony export */   "sell": () => (/* binding */ sell),
/* harmony export */   "refuel": () => (/* binding */ refuel),
/* harmony export */   "logIn": () => (/* binding */ logIn),
/* harmony export */   "startup": () => (/* binding */ startup),
/* harmony export */   "trade": () => (/* binding */ trade),
/* harmony export */   "explore": () => (/* binding */ explore)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./src/util.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ "./src/api.js");
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state.js */ "./src/state.js");
/* harmony import */ var _archive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./archive.js */ "./src/archive.js");
/* harmony import */ var _report_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./report.js */ "./src/report.js");






function getAccount() { return (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.getUser)(_state_js__WEBPACK_IMPORTED_MODULE_2__.state.user.username, _state_js__WEBPACK_IMPORTED_MODULE_2__.state.token).then((0,_util_js__WEBPACK_IMPORTED_MODULE_0__.timeout)(1)); }

async function getMarkets() {
  for (const ship of _state_js__WEBPACK_IMPORTED_MODULE_2__.state.user.ships) {
    await (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.getMarket)(ship.location, _state_js__WEBPACK_IMPORTED_MODULE_2__.state.token);
  }
}

async function fly(shipId, destination) {
  const myShip = (0,_state_js__WEBPACK_IMPORTED_MODULE_2__.ship)(shipId);
  if (myShip.location === destination) return;

  await (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.createFlightPlan)(shipId, destination, _state_js__WEBPACK_IMPORTED_MODULE_2__.state.token);
  await getAccount();
  console.log((0,_report_js__WEBPACK_IMPORTED_MODULE_4__.flightReport)());

  await (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.timeout)(_state_js__WEBPACK_IMPORTED_MODULE_2__.state.flightPlan.timeRemainingInSeconds);
  await (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.timeout)(5); // docking
  await (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.getMarket)(destination, _state_js__WEBPACK_IMPORTED_MODULE_2__.state.token);
  console.log(report(planetReport(_state_js__WEBPACK_IMPORTED_MODULE_2__.state.planet)));
}

async function buy(shipId, good, quantity) {
  const item = (0,_state_js__WEBPACK_IMPORTED_MODULE_2__.marketItem)(good);

  if (!item) {
    console.log((0,_report_js__WEBPACK_IMPORTED_MODULE_4__.availableReport)(good));
    return;
  }

  const canAfford = _state_js__WEBPACK_IMPORTED_MODULE_2__.state.user.credits / item.pricePerUnit;
  const toBuy = Math.min(canAfford, item.quantityAvailable, quantity);

  if (isNaN(toBuy)) debugger;
  if (toBuy <= 0) return;
  await buyGood(shipId, good, toBuy, _state_js__WEBPACK_IMPORTED_MODULE_2__.state.token);
  await getAccount();

  console.log(report([(0,_report_js__WEBPACK_IMPORTED_MODULE_4__.buyReport)(_state_js__WEBPACK_IMPORTED_MODULE_2__.state.order[0]), (0,_report_js__WEBPACK_IMPORTED_MODULE_4__.creditReport)()]));
}

async function sell(shipId, good, quantity) {
  if (quantity <= 0) return;
  await sellGood(shipId, good, quantity, _state_js__WEBPACK_IMPORTED_MODULE_2__.state.token);
  await getAccount();

  console.log(report([(0,_report_js__WEBPACK_IMPORTED_MODULE_4__.sellReport)(_state_js__WEBPACK_IMPORTED_MODULE_2__.state.order[0]), (0,_report_js__WEBPACK_IMPORTED_MODULE_4__.creditReport)()]));
}

async function refuel(shipId, wantedFuel) {
  const cargoFuel = (0,_state_js__WEBPACK_IMPORTED_MODULE_2__.cargo)(shipId, 'FUEL') || { quantity: 0 };
  const neededFuel = wantedFuel - cargoFuel.quantity;

  if (isNaN(neededFuel)) debugger;
  if (neededFuel <= 0) return;
  await buy(shipId, 'FUEL', neededFuel, _state_js__WEBPACK_IMPORTED_MODULE_2__.state.token);
}

async function logIn(options) {
  if (options) {
    _state_js__WEBPACK_IMPORTED_MODULE_2__.state.token = options.token;
    _state_js__WEBPACK_IMPORTED_MODULE_2__.state.user = { username: options.username };
  } else {
    await createToken((0,_util_js__WEBPACK_IMPORTED_MODULE_0__.userName)());
  }

  await getAccount();
  await (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.getSystems)(_state_js__WEBPACK_IMPORTED_MODULE_2__.state.token);
  console.log('Username', _state_js__WEBPACK_IMPORTED_MODULE_2__.state.user.username);
}

async function startup() {
  await takeLoan('STARTUP', _state_js__WEBPACK_IMPORTED_MODULE_2__.state.token);
  await buyShip('OE-NY', 'JW-MK-I', _state_js__WEBPACK_IMPORTED_MODULE_2__.state.token);
  await (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.getMarket)('OE-NY', _state_js__WEBPACK_IMPORTED_MODULE_2__.state.token);
  await refuel(_state_js__WEBPACK_IMPORTED_MODULE_2__.state.user.ships[0].id, 30);
  console.log(report(planetReport(_state_js__WEBPACK_IMPORTED_MODULE_2__.state.planet)));
}

async function trade(options) {
  while (true) {
    const location = (0,_state_js__WEBPACK_IMPORTED_MODULE_2__.ship)(options.shipId).location;

    if (!location) {
      await getAccount();
      continue;
    }

    (0,_archive_js__WEBPACK_IMPORTED_MODULE_3__.beginTrip)();
    const inCargo = (0,_state_js__WEBPACK_IMPORTED_MODULE_2__.cargo)(options.shipId, options.good);

    if (!inCargo) {
      await fly(options.shipId, options.source);
      await refuel(options.shipId, options.fuel);
      const toBuy = fillHold(options.shipId, options.good, options.creditReserve);
      await buy(options.shipId, options.good, toBuy);
    }

    await fly(options.shipId, options.destination);
    const toSell = goodQuantity(options.shipId, options.good);
    await sell(options.shipId, options.good, toSell);
    await refuel(options.shipId, options.fuel);

    (0,_archive_js__WEBPACK_IMPORTED_MODULE_3__.endTrip)();

    const reports = [
      tripReport(),
      profitReport(),
      totalProfitReport()
    ];

    console.log(report(reports));

    if (_state_js__WEBPACK_IMPORTED_MODULE_2__.state.user.credits < 1000) {
      console.log('You\'re broke! Go home.');
      await (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.timeout)(4);
      return;
    }
  }
}

async function explore(options) {
  const symbols = unexploredLocations().map(x => x.symbol);

  for (let i = 0; i < symbols.length; i++) {
    await refuel(options.shipId, 100);
    await fly(options.shipId, symbols[i]);
  }

  console.log(report(systemReport()));
  console.log('Exploration complete.');
}

/***/ }),

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStatus": () => (/* binding */ getStatus),
/* harmony export */   "createToken": () => (/* binding */ createToken),
/* harmony export */   "getUser": () => (/* binding */ getUser),
/* harmony export */   "getLoans": () => (/* binding */ getLoans),
/* harmony export */   "takeLoan": () => (/* binding */ takeLoan),
/* harmony export */   "payLoan": () => (/* binding */ payLoan),
/* harmony export */   "getShips": () => (/* binding */ getShips),
/* harmony export */   "buyShip": () => (/* binding */ buyShip),
/* harmony export */   "getSystems": () => (/* binding */ getSystems),
/* harmony export */   "getSystem": () => (/* binding */ getSystem),
/* harmony export */   "getLocations": () => (/* binding */ getLocations),
/* harmony export */   "getLocation": () => (/* binding */ getLocation),
/* harmony export */   "getMarket": () => (/* binding */ getMarket),
/* harmony export */   "createFlightPlan": () => (/* binding */ createFlightPlan),
/* harmony export */   "getFlightPlan": () => (/* binding */ getFlightPlan),
/* harmony export */   "buyGood": () => (/* binding */ buyGood),
/* harmony export */   "sellGood": () => (/* binding */ sellGood)
/* harmony export */ });
/* harmony import */ var _http_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http.js */ "./src/http.js");
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state.js */ "./src/state.js");



const user = (path) => `/users/${_state_js__WEBPACK_IMPORTED_MODULE_1__.state.user.username}/${path}`;
const game = (path) => `/game/${path}`;

function getStatus() { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.get)(game('status')); }
function createToken(username) { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.post)(`/users/${username}/token`); }
function getUser(username, token) { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.get)(`/users/${username}`, token); }

function getLoans(token) { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.get)(game('loans'), token); }
function takeLoan(type, token) { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.post)(user('loans'), { type }, token); }
function payLoan(loanId, token) { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.put)(`${user('loans')}/${loanId}`, {}, token); }

function getShips(token) { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.get)(game('ships'), token); }
function buyShip(location, type, token) { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.post)(user('ships'), { location, type }, token); }

function getSystems(token) { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.get)(game('systems'), token); }
function getSystem(system, token) { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.get)(game(`systems/${system}`), token); }
function getLocations(system, type, token) { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.get)(game(`systems/${system}/locations?type=${type}`), token); }
function getLocation(location, token) { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.get)(game(`locations/${location}`), token); }
function getMarket(location, token) { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.get)(game(`locations/${location}/marketplace`), token); }

function createFlightPlan(shipId, destination, token) { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.post)(user('flight-plans'), { shipId, destination }, token); }
function getFlightPlan(flightPlanId, token) { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.get)(user(`flight-plans/${flightPlanId}`), token); }

function buyGood(shipId, good, quantity, token) { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.post)(user('purchase-orders'), { shipId, good, quantity: Math.trunc(quantity) }, token); }
function sellGood(shipId, good, quantity, token) { return (0,_http_js__WEBPACK_IMPORTED_MODULE_0__.post)(user('sell-orders'), { shipId, good, quantity: Math.trunc(quantity) }, token); }

/***/ }),

/***/ "./src/archive.js":
/*!************************!*\
  !*** ./src/archive.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "archive": () => (/* binding */ archive),
/* harmony export */   "planet": () => (/* binding */ planet),
/* harmony export */   "unexploredLocations": () => (/* binding */ unexploredLocations),
/* harmony export */   "symbolMatch": () => (/* binding */ symbolMatch),
/* harmony export */   "fillHold": () => (/* binding */ fillHold),
/* harmony export */   "beginTrip": () => (/* binding */ beginTrip),
/* harmony export */   "endTrip": () => (/* binding */ endTrip),
/* harmony export */   "archiveLocations": () => (/* binding */ archiveLocations),
/* harmony export */   "archivePlanet": () => (/* binding */ archivePlanet),
/* harmony export */   "saveArchive": () => (/* binding */ saveArchive)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./src/util.js");
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state.js */ "./src/state.js");



const archive = {};
function planet(symbol) { return archive.planets.find(x => x.symbol === symbol); }
function unexploredLocations() { return (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.locations)().filter(location => !planet(location)); }
function symbolMatch(existing, incoming) { return existing.symbol === incoming.symbol; }

function fillHold(shipId, good, creditReserve) {
  exports.space = (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.remainingCargo)(shipId);
  exports.price = (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.maxAfford)(good, creditReserve);
  return Math.min(space, price);
}

function beginTrip() {
  archive.startCredits = _state_js__WEBPACK_IMPORTED_MODULE_1__.state.user.credits;
}

function endTrip() {
  archive.lastProfit = _state_js__WEBPACK_IMPORTED_MODULE_1__.state.user.credits - archive.startCredits;
  archive.trips = (archive.trips || 0) + 1;
  archive.totalProfit = (archive.totalProfit || 0) + archive.lastProfit;
}

function archiveLocations() {
  if (!_state_js__WEBPACK_IMPORTED_MODULE_1__.state.locations) return;
  archive.locations = _state_js__WEBPACK_IMPORTED_MODULE_1__.state.locations.reduce(
    (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.upsert)(symbolMatch),
    archive.locations || []
  );
}

function archivePlanet() {
  if (!_state_js__WEBPACK_IMPORTED_MODULE_1__.state.planet) return;
  archive.planets = [_state_js__WEBPACK_IMPORTED_MODULE_1__.state.planet].reduce(
    (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.upsert)(symbolMatch),
    archive.planets || []
  );
}

function saveArchive() {
  archiveLocations();
  archivePlanet();
}

/***/ }),

/***/ "./src/http.js":
/*!*********************!*\
  !*** ./src/http.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "post": () => (/* binding */ post),
/* harmony export */   "put": () => (/* binding */ put)
/* harmony export */ });
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-fetch */ "./node_modules/node-fetch/browser.js");
/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.js */ "./src/settings.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ "./src/util.js");
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state.js */ "./src/state.js");
/* harmony import */ var _archive_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./archive.js */ "./src/archive.js");






const http = async(method, path, fetchBody, token) => {
  const body = fetchBody ? JSON.stringify(fetchBody) : null;

  const res = await node_fetch__WEBPACK_IMPORTED_MODULE_0__(`${_settings_js__WEBPACK_IMPORTED_MODULE_1__.root}${path}`, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  const json = await res.json();

  (0,_state_js__WEBPACK_IMPORTED_MODULE_3__.saveState)(json);
  (0,_archive_js__WEBPACK_IMPORTED_MODULE_4__.saveArchive)();
  await (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.timeout)(1);

  return json;
};

function get(path, token) { return http('GET', path, null, token); }
function post(path, body, token) { return http('POST', path, body, token); }
function put(path, body, token) { return http('PUT', path, body, token); }

/***/ }),

/***/ "./src/report.js":
/*!***********************!*\
  !*** ./src/report.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "report": () => (/* binding */ report),
/* harmony export */   "planetReport": () => (/* binding */ planetReport),
/* harmony export */   "systemReport": () => (/* binding */ systemReport),
/* harmony export */   "buyReport": () => (/* binding */ buyReport),
/* harmony export */   "sellReport": () => (/* binding */ sellReport),
/* harmony export */   "creditReport": () => (/* binding */ creditReport),
/* harmony export */   "flightReport": () => (/* binding */ flightReport),
/* harmony export */   "tripReport": () => (/* binding */ tripReport),
/* harmony export */   "profitReport": () => (/* binding */ profitReport),
/* harmony export */   "totalProfitReport": () => (/* binding */ totalProfitReport),
/* harmony export */   "availableReport": () => (/* binding */ availableReport),
/* harmony export */   "poorReport": () => (/* binding */ poorReport)
/* harmony export */ });
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.js */ "./src/state.js");
/* harmony import */ var _archive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./archive.js */ "./src/archive.js");



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
function systemReport() { return [].concat(..._archive_js__WEBPACK_IMPORTED_MODULE_1__.archive.planets.sort(sortLocations).map(x => [...planetReport(x), ''])); }
function buyReport(order) { return `Bought ${order.quantity} ${order.good} for ${order.total} at ${order.pricePerUnit} each.`; }
function sellReport(order) { return `Sold ${order.quantity} ${order.good} for ${order.total}.`; }
function creditReport() { return `${_state_js__WEBPACK_IMPORTED_MODULE_0__.state.user.credits} credits remaining.`; }
function flightReport() { return `Flying to ${(0,_state_js__WEBPACK_IMPORTED_MODULE_0__.systemLocation)(_state_js__WEBPACK_IMPORTED_MODULE_0__.state.flightPlan.destination).name}.`; }
function tripReport() { return `Completed trip number ${_archive_js__WEBPACK_IMPORTED_MODULE_1__.archive.trips}.`; }
function profitReport() { return `${_archive_js__WEBPACK_IMPORTED_MODULE_1__.archive.lastProfit} profit.`; }
function totalProfitReport() { return `${_archive_js__WEBPACK_IMPORTED_MODULE_1__.archive.totalProfit} total profit.`; }
function availableReport(good) { return `${good} is not available here.`; }
function poorReport(good, quantity) { return `Cannot afford to buy ${quantity} of ${good}`; }

/***/ }),

/***/ "./src/roles.js":
/*!**********************!*\
  !*** ./src/roles.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "richMan": () => (/* binding */ richMan),
/* harmony export */   "richExplorer": () => (/* binding */ richExplorer),
/* harmony export */   "poorMan": () => (/* binding */ poorMan),
/* harmony export */   "explorer": () => (/* binding */ explorer)
/* harmony export */ });
/* harmony import */ var _actions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions.js */ "./src/actions.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ "./src/api.js");
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state.js */ "./src/state.js");




async function richMan() {
  await (0,_actions_js__WEBPACK_IMPORTED_MODULE_0__.logIn)({
    token: '212132e0-a388-4d74-a176-ff74c01e6f94',
    username: 'dcabines'
  });

  const myShip = (0,_state_js__WEBPACK_IMPORTED_MODULE_2__.ship)('ckm2vc3vk16160214989jh86ygmm');

  if (myShip.location) {
    await (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.getMarket)(myShip.location, _state_js__WEBPACK_IMPORTED_MODULE_2__.state.token);
  }

  await (0,_actions_js__WEBPACK_IMPORTED_MODULE_0__.trade)({
    good: 'METALS',
    source: 'OE-NY',
    destination: 'OE-PM',
    fuel: 30,
    creditReserve: 10000,
    shipId: 'ckm2vc3vk16160214989jh86ygmm'
  });
}

async function richExplorer() {
  await (0,_actions_js__WEBPACK_IMPORTED_MODULE_0__.logIn)({
    token: '212132e0-a388-4d74-a176-ff74c01e6f94',
    username: 'dcabines'
  });

  const myShip = (0,_state_js__WEBPACK_IMPORTED_MODULE_2__.ship)('ckm2vc3vk16160214989jh86ygmm');

  if (myShip.location) {
    await (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.getMarket)(myShip.location);
  }

  await (0,_actions_js__WEBPACK_IMPORTED_MODULE_0__.explore)({
    shipId: myShip.id
  });
}

async function poorMan() {
  await (0,_actions_js__WEBPACK_IMPORTED_MODULE_0__.logIn)();
  await (0,_actions_js__WEBPACK_IMPORTED_MODULE_0__.startup)();

  await (0,_actions_js__WEBPACK_IMPORTED_MODULE_0__.trade)({
    good: 'METALS',
    source: 'OE-PM',
    destination: 'OE-NY',
    fuel: 30,
    creditReserve: 0,
    shipId: _state_js__WEBPACK_IMPORTED_MODULE_2__.state.user.ships[0].id
  });

  await poorMan();
}

async function explorer() {
  await (0,_actions_js__WEBPACK_IMPORTED_MODULE_0__.logIn)();
  await (0,_actions_js__WEBPACK_IMPORTED_MODULE_0__.startup)();
  await (0,_actions_js__WEBPACK_IMPORTED_MODULE_0__.explore)({
    shipId: _state_js__WEBPACK_IMPORTED_MODULE_2__.state.user.ships[0].id
  });
}

/***/ }),

/***/ "./src/settings.js":
/*!*************************!*\
  !*** ./src/settings.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "root": () => (/* binding */ root)
/* harmony export */ });
const root = 'https://api.spacetraders.io';

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "state": () => (/* binding */ state),
/* harmony export */   "saveState": () => (/* binding */ saveState),
/* harmony export */   "system": () => (/* binding */ system),
/* harmony export */   "locations": () => (/* binding */ locations),
/* harmony export */   "systemLocation": () => (/* binding */ systemLocation),
/* harmony export */   "marketItem": () => (/* binding */ marketItem),
/* harmony export */   "ship": () => (/* binding */ ship),
/* harmony export */   "cargo": () => (/* binding */ cargo),
/* harmony export */   "cargoTotal": () => (/* binding */ cargoTotal),
/* harmony export */   "remainingCargo": () => (/* binding */ remainingCargo),
/* harmony export */   "goodQuantity": () => (/* binding */ goodQuantity),
/* harmony export */   "maxAfford": () => (/* binding */ maxAfford)
/* harmony export */ });
const state = {};
function saveState(data) { return Object.assign(state, data); }

function system() { return state.systems[0]; }
function locations() { return system().locations; }
function systemLocation(symbol) { return locations().find(x => x.symbol === symbol); }
function marketItem(symbol) { return state.planet.marketplace.find(x => x.symbol === symbol); }

function ship(shipId) { return state.user.ships.find(x => x.id === shipId); }
function cargo(shipId, good) { return ship(shipId).cargo.find(x => x.good === good); }
function cargoTotal(shipId) { return ship(shipId).cargo.reduce((p, c) => p + c.quantity, 0); }
function remainingCargo(shipId) { return ship(shipId).maxCargo - cargoTotal(shipId); }
function goodQuantity(shipId, good) { return cargo(shipId, good).quantity; }

function maxAfford(good, creditReserve) {
  exports.credits = state.user.credits - creditReserve;
  exports.price = marketItem(good).pricePerUnit;
  return credits / price;
}

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timeout": () => (/* binding */ timeout),
/* harmony export */   "userName": () => (/* binding */ userName),
/* harmony export */   "upsert": () => (/* binding */ upsert)
/* harmony export */ });
function timeout(seconds) { return new Promise(resolve => setTimeout(resolve, seconds * 1000)); }
function userName() { return `user-${new Date().getTime()}-${Math.random()}`; }

function upsert(findKey) {
  return (destination, incoming) => {
    const existing = destination.find(x => findKey(x, incoming));
    const others = destination.filter(x => x !== existing);
    const updated = {...existing, ...incoming };
    return [...others, updated];
  };
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions.js */ "./src/actions.js");
/* harmony import */ var _roles_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./roles.js */ "./src/roles.js");



_actions_js__WEBPACK_IMPORTED_MODULE_0__.logIn();
_actions_js__WEBPACK_IMPORTED_MODULE_0__.refuel('ckm2vc3vk16160214989jh86ygmm', 30);
//richMan();
})();

/******/ })()
;
//# sourceMappingURL=main.js.map