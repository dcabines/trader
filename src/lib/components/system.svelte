<script>
  import Location from "$lib/components/location.svelte";
  export let system;
</script>

<div class="card">
  <span>{system.name}</span>
  {#each system.locations as location}
    <Location {location} />
  {/each}
</div>
