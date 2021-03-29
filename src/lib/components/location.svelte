<script>
  import state from '$lib/state';

  export let location;

  $: ship = $state.user.ships[0];
  $: canFly = ship && ship.location && ship.location !== location.symbol;
  const fly = () => state.fly(ship.id, location.symbol);
</script>

{#if location}
  <div class="card">
    {#if canFly}
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
{/if}

<style>
  .card div {
    display: flex;
    justify-content: space-between;
  }

  .card span:first-child {
    flex: 1;
  }
</style>
