<script>
  import * as api from '$lib/traders/api';

  export let loan;

  const payLoan = () => {
    api.payLoan(loan.type);
  };
</script>

<div class="card">
  <div>
    <button on:click={payLoan}>Pay</button>
  </div>
  <div>
    <span>Type</span>
    <span>{loan.type}</span>
  </div>
  <div>
    <span>Id</span>
    <span>{loan.id}</span>
  </div>
  <div>
    <span>Due</span>
    <span>{new Date(loan.due).toDateString()}</span>
  </div>
  <div>
    <span>Repayment Amount</span>
    <span>{loan.repaymentAmount}</span>
  </div>
  <div>
    <span>Status</span>
    <span>{loan.status}</span>
  </div>
</div>

<style>
  .card {
    min-width: 400px;
  }

  .card div {
    display: flex;
    justify-content: space-between;
  }

  .card span:first-child {
    flex: 1;
  }
</style>
