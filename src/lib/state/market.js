import * as api from '$lib/traders/api';
import { upsert } from '$lib/traders/util';

const upsertId = upsert((existing, incoming) => existing.id === incoming.id);
const upsertSymbol = upsert((existing, incoming) => existing.symbol === incoming.symbol);

export const getMarket = (update) => async(market) => {
  const result = await api.getMarket(market);

  update(state => ({
    ...state,
    ...result,
    locations: upsertSymbol(state.locations, result.location)
  }));
};

export const buyGood = (update) => async(shipId, symbol, quantity) => {
  const { credits, order, ship, error } = await api.buyGood(shipId, symbol, quantity);

  if (error) {
    update(state => ({...state, error }));
    return;
  }

  update(state => ({
    ...state,
    credits,
    order,
    user: {
      ...state.user,
      ships: upsertId(state.user.ships, ship)
    },
  }));
};

export const sellGood = (update) => async(shipId, good, quantity) => {
  const { credits, order, ship, error } = await api.sellGood(shipId, good, quantity);

  if (error) {
    update(state => ({...state, error }));
    return;
  }

  update(state => ({
    ...state,
    credits,
    order,
    user: {
      ...state.user,
      ships: upsertId(state.user.ships, ship)
    },
  }));
};