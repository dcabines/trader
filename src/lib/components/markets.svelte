<script>
  import state from "$lib/state";
  import Market from "$lib/components/market-log.svelte";
  $: locations = $state.locations;
</script>

{#if locations.length > 0}
  <div>
    <span>Markets</span>
    {#each locations as location}
      <Market symbol={location.symbol} />
    {/each}
  </div>
{/if}
