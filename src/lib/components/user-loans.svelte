<script>
  import state from "$lib/state";
  import UserLoan from "$lib/components/user-loan.svelte";
  $: loans = $state.user.loans;
</script>

{#if loans.length > 0}
  <div>
    <span>Loans</span>
    {#each loans as loan}
      <UserLoan loanId={loan.id} />
    {/each}
  </div>
{/if}
