<script>
  import * as api from "../traders/api";
  import { loans } from "../traders/state";
  import Loan from "../components/loan.svelte";
</script>

<div>
  <span>
    <button on:click={api.getLoans}>fetch</button>
    Loans
  </span>
  {#each $loans as loan}
    <Loan {loan} />
  {/each}
</div>
