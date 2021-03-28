<script>
  import * as api from "$lib/traders/api";
  import { loans } from "$lib/traders/state";
  import Loan from "$lib/components/loan.svelte";
</script>

<div>
  <span>
    {#if $loans.length === 0}
      <button on:click={api.getLoans}>fetch</button>
    {/if}
    Loans
  </span>
  {#each $loans as loan}
    <Loan {loan} />
  {/each}
</div>
