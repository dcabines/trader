import * as api from '$lib/traders/api';

export const getStatus = (update) => async() => {
  const status = await api.getStatus();

  update(state => ({...state, ...status }));
};