<script>
  import * as api from "$lib/traders/api";
  import { ships } from "$lib/traders/state";
  import Ship from "./ship.svelte";
</script>

<div>
  <span>
    {#if $ships.length === 0}
      <button on:click={api.getShips}>fetch</button>
    {/if}
    Ships
  </span>
  {#each $ships as ship}
    <Ship {ship} />
  {/each}
</div>
