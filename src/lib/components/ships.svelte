<script>
  import state from '$lib/state';
  import Ship from "./ship.svelte";
  $: ships = $state.ships;
</script>

<div>
  <span>
    {#if ships.length === 0}
      <button on:click={state.getShips}>fetch</button>
    {/if}
    Ships
  </span>
  {#each ships as ship}
    <Ship {ship} />
  {/each}
</div>
