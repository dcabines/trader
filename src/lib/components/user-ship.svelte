<script>
  import * as api from "$lib/traders/api";
  import Cargo from "./cargo.svelte";
  import Market from "./market.svelte";

  export let ship = {};

  const sellShip = () => api.sellShip(ship.id);
</script>

{#if ship}
  <div class="card">
    <div>
      {#if ship && ship.location}
        <button on:click={sellShip}>sell</button>
      {/if}
      <span>{ship.id}</span>
    </div>
    {#if ship.location}
      <div>
        <span>Location</span>
        <span>{ship.location}</span>
      </div>
      <div>
        <span>Coords</span>
        <span>{ship.x}-{ship.x}</span>
      </div>
    {/if}
    <div>
      <span>Space Available</span>
      <span>{ship.spaceAvailable}</span>
    </div>
    <div>
      <span>Type</span>
      <span>{ship.type}</span>
    </div>
    <div>
      <span>Class</span>
      <span>{ship.class}</span>
    </div>
    <div>
      <span>Max Cargo</span>
      <span>{ship.maxCargo}</span>
    </div>
    <div>
      <span>Speed</span>
      <span>{ship.speed}</span>
    </div>
    <div>
      <span>Manufacturer</span>
      <span>{ship.manufacturer}</span>
    </div>
    <div>
      <span>Plating</span>
      <span>{ship.plating}</span>
    </div>
    <div>
      <span>Weapons</span>
      <span>{ship.weapons}</span>
    </div>

    <Cargo {ship} />

    {#if ship.location}
      <Market {ship} />
    {/if}
  </div>
{/if}

<style>
  .card > div {
    display: flex;
    justify-content: space-between;
  }

  .card span:first-child {
    flex: 1;
  }
</style>
