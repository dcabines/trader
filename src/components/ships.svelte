<script>
  import { ships } from "../traders/state";
  import Ship from "../components/ship.svelte";
</script>

  <div>
    {#if $ships.length > 0}
      {#each $ships as ship}
        <Ship shipId={ship.id} />
      {/each}
    {/if}
  </div>
