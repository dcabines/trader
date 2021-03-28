<script>
  import { state } from '$lib/traders/state';
  import UserShip from "./user-ship.svelte";

</script>

<div>
  {#if $state.user.ships.length > 0}
    <span>Ships</span>
    {#each $state.user.ships as ship}
      <UserShip shipId={ship.id} />
    {/each}
  {/if}
</div>
