import * as api from '$lib/traders/api';

export const getLoans = (update) => async() => {
  const { loans } = await api.getLoans();
  update(state => ({...state, loans }));
};

export const takeLoan = (update) => async(type) => {
  const { user } = await api.takeLoan(type);
  update(state => ({...state, user: {...state.user, ...user } }));
};

export const payLoan = (update) => async(loanId) => {
  const loan = await api.payLoan(loanId);
  update(state => ({...state, loan }));
};