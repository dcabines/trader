<script>
  import { derived } from "svelte/store";
  import { ship, marketplace } from "../traders/state";
  import * as api from "../traders/api";

  let destination = "OE-PM";

  let buyItem = "";
  let buyQuantity = 0;

  let sellItem = "";
  let sellQuantity = 0;

  export let shipId;
  const myShip = ship(shipId);
  const shipLocation = derived(myShip, ($myShip) => $myShip.location);
  const shipCargo = derived(myShip, ($myShip) => $myShip.cargo);
  const fly = () => api.createFlightPlan(destination);
  const market = () => api.getMarket($shipLocation);
  const buy = () => api.buyGood(buyItem, buyQuantity);
  const sell = () => api.sellGood(sellItem, sellQuantity);
</script>

<div class="card">
  {#if $shipLocation}
    <span>{$shipLocation}</span>
    <button on:click={market}>market</button>

    <div>
      <input bind:value={destination} />
      <button on:click={fly}>fly</button>
    </div>

    {#if $marketplace.length > 0}
      <div>
        <input bind:value={buyQuantity} />

        <select bind:value={buyItem}>
          {#each $marketplace as item}
            <option value={item.symbol}>{item.symbol}</option>
          {/each}
        </select>

        <button on:click={buy}>buy</button>
      </div>

      {#if $shipCargo.length > 0}
        <div>
          <input bind:value={sellQuantity} />

          <select bind:value={sellItem}>
            {#each $shipCargo as item}
              <option value={item.good}>{item.good}</option>
            {/each}
          </select>

          <button on:click={sell}>sell</button>
        </div>
      {/if}
    {/if}
  {/if}
</div>

<style>
  .card {
    border: 1px solid #ddd;
    border-radius: 3px;
    margin: 10px 0;
    padding: 10px;
  }
</style>
