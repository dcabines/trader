<script>
  import state from "$lib/state";

  export let ship = {};
  const minPrice = ship.purchaseLocations
    .map((x) => x.price)
    .reduce((p, c) => (p < c ? p : c), ship.purchaseLocations[0].price);

  $: credits = $state.user.credits;
  $: canAfford = minPrice <= credits;

  const buyShip = (purchaseLocation) =>
    state.buyShip(purchaseLocation, ship.type);
</script>

{#if canAfford}
  <div class="card">
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

    {#each ship.purchaseLocations as purchaseLocation}
      <div class="card">
        <div>
          <button on:click={() => buyShip(purchaseLocation.location)}
            >buy</button
          >
        </div>
        <div>
          <div>
            <span>Location</span>
            <span>{purchaseLocation.location}</span>
          </div>
          <div>
            <span>Price</span>
            <span>{purchaseLocation.price}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .card > div {
    display: flex;
    justify-content: space-between;
  }

  .card > .card > div {
    display: block;
  }

  .card span:first-child {
    flex: 1;
  }
</style>
