<script>
  import * as api from '$lib/traders/api';
  import { systems } from '$lib/traders/state';
  import System from "$lib/components/system.svelte";
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
