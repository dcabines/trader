<script>
  import state from '$lib/state';
  import Loan from "$lib/components/loan.svelte";
  $: loans = $state.loans;
</script>

<div>
  <span>
    {#if loans.length === 0}
      <button on:click={state.getLoans}>fetch</button>
    {/if}
    Loans
  </span>
  {#each loans as loan}
    <Loan {loan} />
  {/each}
</div>
