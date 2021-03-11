import { logIn, startup, trade, explore } from './actions.js';
import { getMarket } from './api.js';
import { state, ship } from './state.js';

export async function richMan() {
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
    creditReserve: 10000,
    shipId: 'ckm2vc3vk16160214989jh86ygmm'
  });
}

export async function richExplorer() {
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
}

export async function poorMan() {
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
}

export async function explorer() {
  await logIn();
  await startup();
  await explore({
    shipId: state.user.ships[0].id
  });
}