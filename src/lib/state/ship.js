import * as api from '$lib/traders/api';

export const getShips = (update) => async() => {
  const { ships } = await api.getShips();
  update(state => ({...state, ships }));
};

export const buyShip = (update) => async(location, type) => {
  const { user } = await api.buyShip(location, type);
  update(state => ({...state, user: {...state.user, ...user } }));
};

export const sellShip = (update) => async(loanId) => {
  // const loan = await api.payLoan(loanId);
  // update(state => ({...state, loan }));
};

export const fly = (update) => async(shipId, destination) => {
  const { flightPlan, error } = await api.createFlightPlan(shipId, destination);

  if (error) {
    update(state => ({...state, error }));
    return;
  }

  update(state => {
    const thisShip = state.user.ships.find((x) => x.id === shipId);
    const otherShips = state.user.ships.filter((x) => x !== thisShip);

    return {
      ...state,
      flightPlan: {
        ...flightPlan,
        flightTimeInSeconds: flightPlan.timeRemainingInSeconds,
        percentRamaining: 100
      },
      location: {},
      user: {
        ...state.user,
        ships: [
          ...otherShips,
          {
            ...thisShip,
            location: null,
          },
        ],
      },
    };
  });

  const countdown = setInterval(() => {
    update(state => {
      const timeRemainingInSeconds = state.flightPlan.timeRemainingInSeconds - 1;
      const percentRamaining = timeRemainingInSeconds / state.flightPlan.flightTimeInSeconds * 100;

      if (state.flightPlan.timeRemainingInSeconds > 0) {
        return {
          ...state,
          flightPlan: {
            ...state.flightPlan,
            timeRemainingInSeconds,
            percentRamaining: Math.ceil(percentRamaining)
          },
        };
      }

      clearInterval(countdown);
      const thisShip = state.user.ships.find((x) => x.id === shipId);
      const otherShips = state.user.ships.filter((x) => x !== thisShip);

      return {
        ...state,
        flightPlan: {},
        user: {
          ...state.user,
          ships: [
            ...otherShips,
            {
              ...thisShip,
              location: flightPlan.destination,
            },
          ],
        },
      };
    });
  }, 1000);

  return countdown;
};