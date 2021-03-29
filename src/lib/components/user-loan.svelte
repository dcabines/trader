<script>
  import state from "$lib/state";

  export let loanId;

  $: loan = $state.user.loans.find((x) => x.id === loanId);

  const payLoan = () => state.payLoan(loanId);
</script>

{#if loan}
  <div class="card">
    <div>
      <button on:click={payLoan}>pay</button>
      <span>{loan.id}</span>
    </div>
    <div>
      <span>Type</span>
      <span>{loan.type}</span>
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
{/if}

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
