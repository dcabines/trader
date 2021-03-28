<script>
  import * as api from "$lib/traders/api";
  import { state, saveState } from "$lib/traders/state";
  export let location;
  $: ship = $state.user.ships[0];

  const fly = async () => {
    await api.createFlightPlan(ship.id, location.symbol);

    if (!$state.flightPlan) return;

    const thisState = $state;
    const thisShip = thisState.user.ships.find((x) => x.id === ship.id);
    const otherShips = thisState.user.ships.filter((x) => x !== thisShip);

    saveState({
      location: {},
      user: {
        ...thisState.user,
        ships: [
          ...otherShips,
          {
            ...thisShip,
            location: null,
          },
        ],
      },
    });
  };
</script>

{#if location}
  <div class="card">
    {#if ship && ship.location && ship.location !== location.symbol}
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
