import * as api from '$lib/traders/api';

export const getMarket = (update) => async(market) => {
  const { location } = await api.getMarket(market);

  update(state => {
    const thisLocation = state.locations.find(x => x.symbol === location.symbol);
    const otherLocations = state.locations.filter(x => x !== thisLocation);

    return {
      ...state,
      location,
      locations: [
        ...otherLocations,
        location
      ]
    };
  });
};

export const buyGood = (update) => async(shipId, symbol, quantity) => {
  const { credits, order, ship } = await api.buyGood(shipId, symbol, quantity);

  update(state => {
    const thisShip = state.user.ships.find((x) => x.id === ship.id);
    const otherShips = state.user.ships.filter((x) => x !== thisShip);

    return {
      ...state,
      credits,
      order,
      user: {
        ...state.user,
        ships: [
          ...otherShips,
          {
            ...thisShip,
            ...ship,
          },
        ],
      },
    };
  });
};

export const sellGood = (update) => async(shipId, good, quantity) => {
  const { credits, order, ship } = await api.sellGood(shipId, good, quantity);

  update(state => {
    const thisShip = state.user.ships.find((x) => x.id === ship.id);
    const otherShips = state.user.ships.filter((x) => x !== thisShip);

    return {
      ...state,
      credits,
      order,
      user: {
        ...state.user,
        ships: [
          ...otherShips,
          {
            ...thisShip,
            ...ship,
          },
        ],
      },
    };
  });
};