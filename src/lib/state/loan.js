import * as api from '$lib/traders/api';

export const getLoans = (update) => async() => {
  const result = await api.getLoans();
  update(state => ({...state, ...result }));
};

export const takeLoan = (update) => async(type) => {
  const result = await api.takeLoan(type);
  update(state => ({...state, ...result }));
};

export const payLoan = (update) => async(loanId) => {
  const result = await api.payLoan(loanId);
  update(state => ({...state, ...result }));
};