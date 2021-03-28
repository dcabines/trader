<script>
  import { userLoans } from '$lib/traders/state';
  import UserLoan from "$lib/components/user-loan.svelte";
</script>

{#if $userLoans.length > 0}
  <div>
    <span>Loans</span>
    {#each $userLoans as loan}
      <UserLoan loanId={loan.id} />
    {/each}
  </div>
{/if}
