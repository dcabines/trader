<script>
  import { userLoans } from "../traders/state";
  import UserLoan from "../components/user-loan.svelte";
</script>

{#if $userLoans.length > 0}
  <div>
    <span>Loans</span>
    {#each $userLoans as loan}
      <UserLoan {loan} />
    {/each}
  </div>
{/if}
