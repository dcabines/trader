<script>
  import "$lib/style/global.css";
  import state from "$lib/state";
  import Account from "$lib/components/account.svelte";
  import Game from "$lib/components/game.svelte";
  import Ships from "$lib/components/ships.svelte";
  import Loans from "$lib/components/loans.svelte";
  import User from "$lib/components/user.svelte";
  import UserLoans from "$lib/components/user-loans.svelte";
  import UserShips from "$lib/components/user-ships.svelte";
  import TreeView from "$lib/components/tree-view.svelte";
  import Systems from "$lib/components/systems.svelte";
  import Error from "$lib/components/error.svelte";
  import FlightPlan from "$lib/components/flight-plan.svelte";
  import Markets from "$lib/components/markets.svelte";
  $: hasLoan = $state.user.loans.length > 0;
  $: ship = $state.user.ships[0];
</script>

<div>
  <Error />
</div>

<div class="content">
  <div>
    <Game />
    <Account />

    {#if $state.loggedIn}
      {#if !hasLoan}
        <Loans />
      {/if}

      {#if !ship}
        <Ships />
      {/if}

      <Markets />
      <Systems />
    {/if}
  </div>

  <div>
    <User />
    <UserLoans />
    <UserShips />
    <FlightPlan />
  </div>

  <div>
    <TreeView label="state" data={$state} />
  </div>
</div>

<style>
  .content {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
</style>
