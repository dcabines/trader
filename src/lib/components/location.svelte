<script>
  import * as api from '$lib/traders/api';
  import { state } from '$lib/traders/state';
  export let location;
  $: ship = $state.user.ships[0];
  const fly = () => api.createFlightPlan(ship.id, location.symbol);
</script>

<div class="card">
  {#if ship}
  <div>
    <button on:click={fly}>fly</button>
  </div>
  {/if}
  <div>
    <span>Name</span>
    <span>{location.name}</span>
  </div>
  <div>
    <span>Type</span>
    <span>{location.type}</span>
  </div>
  <div>
    <span>Symbol</span>
    <span>{location.symbol}</span>
  </div>
  <div>
    <span>Coords</span>
    <span>{location.x} {location.y}</span>
  </div>
</div>

<style>
  .card div {
    display: flex;
    justify-content: space-between;
  }

  .card span:first-child {
    flex: 1;
  }
</style>