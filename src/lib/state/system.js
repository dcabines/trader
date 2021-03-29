import * as api from '$lib/traders/api';

export const getSystems = (update) => async() => {
  const { systems } = await api.getSystems();

  update(state => ({...state, systems }));
};