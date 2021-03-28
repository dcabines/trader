<script>
  import * as api from '$lib/traders/api';
  import { loans } from '$lib/traders/state';
  import Loan from "$lib/components/loan.svelte";
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
