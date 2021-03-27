<script>
  import * as api from "../traders/api";
  import { ships } from "../traders/state";
  import Ship from "./ship.svelte";
</script>

<div>
  <span>
    <button on:click={api.getShips}>fetch</button>
    Ships
  </span>
  {#each $ships as ship}
    <Ship {ship} />
  {/each}
</div>
