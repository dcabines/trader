<script>
  import state from '$lib/state';
  import System from "$lib/components/system.svelte";
  $: systems = $state.systems;
</script>

<div>
  <span>
    {#if systems.length === 0}
      <button on:click={state.getSystems}>fetch</button>
    {/if}
    Systems
  </span>
  {#each systems as system}
    <System {system} />
  {/each}
</div>
