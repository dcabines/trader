<script>
  import Account from "../lib/components/account.svelte";
  import Game from "../lib/components/game.svelte";
  import Ships from "../lib/components/ships.svelte";
  import Loans from "../lib/components/loans.svelte";
  import User from "../lib/components/user.svelte";
  import UserLoans from "../lib/components/user-loans.svelte";
  import UserShips from "../lib/components/user-ships.svelte";
  import TreeView from "$lib/components/tree-view.svelte";
  import Systems from "$lib/components/systems.svelte";
  import { state, loggedIn } from "../lib/traders/state";
</script>

<div class="content">
  <div>
    <Game />
    <Account />
    {#if $loggedIn}
      <Loans />
      <Ships />
      <Systems />
    {/if}
  </div>
  <div>
    {#if $loggedIn}
      <User />
      <UserLoans />
      <UserShips />
    {/if}
  </div>
  <div>
    <TreeView data={$state} />
  </div>
</div>

<style>
  .content {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
</style>
