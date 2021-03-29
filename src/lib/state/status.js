import * as api from '$lib/traders/api';

export const getStatus = (update) => async() => {
  const result = await api.getStatus();
  update(state => ({...state, ...result }));
};