<script>
  import * as api from "../traders/api";
  import { systems } from "../traders/state";
  import System from "../components/system.svelte";
</script>

<div>
  <span>
    <button on:click={api.getSystems}>fetch</button>
    Systems
  </span>
  {#each $systems as system}
    <System {system} />
  {/each}
</div>
