const fetch = require("node-fetch");
const ping = () => fetch('https://dcabines-trader.herokuapp.com').then(() => { console.log('ping'); });
const minutes = 5;
const timeout = minutes * 60 * 1000;

ping();
setInterval(ping, timeout);
