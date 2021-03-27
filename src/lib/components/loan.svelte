<script>
  import * as api from "../traders/api";

  export let loan;

  const takeLoan = () => {
    api.takeLoan(loan.type);
  };
</script>

<div class="card">
  <div>
    <button on:click={takeLoan}>take</button>
  </div>
  <div>
    <span>Type</span>
    <span>{loan.type}</span>
  </div>
  <div>
    <span>Amount</span>
    <span>{loan.amount}</span>
  </div>
  <div>
    <span>Rate</span>
    <span>{loan.rate}</span>
  </div>
  <div>
    <span>Term In Days</span>
    <span>{loan.termInDays}</span>
  </div>
  <div>
    <span>Collateral Required</span>
    <span>{loan.collateralRequired}</span>
  </div>
</div>

<style>
  .card div {
    display: flex;
    justify-content: space-between;
  }

  .card span:first-child {
    flex: 1;
  }
</style>
