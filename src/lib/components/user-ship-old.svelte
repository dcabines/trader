<script lang="typescript">
  import { userShip, system, marketplace } from '$lib/traders/state';
  import * as api from '$lib/traders/api';
  import Market from "$lib/components/market.svelte";

  let destination = "OE-PM";

  let buyItem = "";
  let buyQuantity = 0;

  let sellItem = "";
  let sellQuantity = 0;

  export let ship: { id: number };
  const myShip = userShip(ship.id);
  $: shipLocation = $myShip.location;
  $: shipCargo = $myShip.cargo;
  const fly = () => api.createFlightPlan(destination);
  const market = () => api.getMarket(shipLocation);
  const buy = () => api.buyGood(buyItem, buyQuantity);
  const sell = () => api.sellGood(sellItem, sellQuantity);
</script>

<div class="card">
  {#if $myShip}
    <div>{$myShip.manufacturer} {$myShip.type}</div>

    {#if $myShip.location}
      {#if ($system.locations || []).length > 0}
        <div>
          <button on:click={fly}>fly</button>
          <select bind:value={destination}>
            {#each $system.locations || [] as location}
              <option value={location.symbol}>
                {location.symbol}
                {location.name}
              </option>
            {/each}
          </select>
        </div>
      {/if}

      <div>
        <button on:click={market}>market</button>
        <span>{$myShip.location}</span>
      </div>

      {#if $marketplace.length > 0}
        <div>
          <button on:click={buy}>buy</button>
          <input class="small" bind:value={buyQuantity} />

          <select bind:value={buyItem}>
            {#each $marketplace as item}
              <option value={item.symbol}>{item.symbol}</option>
            {/each}
          </select>
        </div>

        {#if shipCargo.length > 0}
          <div>
            <button on:click={sell}>sell</button>
            <input class="small" bind:value={sellQuantity} />

            <select bind:value={sellItem}>
              {#each shipCargo as item}
                <option />
                <option value={item.good}>{item.good}</option>
              {/each}
            </select>
          </div>
        {/if}
      {/if}
    {/if}

    {#if shipCargo.length > 0}
      <div class="card">
        {#each shipCargo as item}
          <div>{item.quantity} {item.good}</div>
        {/each}
      </div>
    {/if}
  {/if}

  <Market />
</div>

<style>
  .card {
    border: 1px solid #ddd;
    border-radius: 3px;
    margin: 10px 0;
    padding: 10px;
    min-width: 0;
  }

  input,
  select {
    height: 20px;
    margin: 5px 0;
    padding: 0 2px;
    border: 1px solid black;
    box-sizing: border-box;
  }

  input.small {
    width: 40px;
  }
</style>
