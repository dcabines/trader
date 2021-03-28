<script>
  import { marketplace } from '$lib/traders/state';
  import { state, saveState } from '$lib/traders/state';
  import * as api from '$lib/traders/api';

  export let shipId;
  $: ship = $state.user.ships.find((x) => x.id === shipId);

  $: items = $marketplace.sort((a, b) =>
    a.pricePerUnit < b.pricePerUnit ? -1 : 1
  );

  const getMarket = () => {
    api.getMarket(ship.location);
  };

  const buyGood = async (symbol) => {
    await api.buyGood(shipId, symbol, 1);
    await api.getMarket(ship.location);

    const thisState = $state;
    const thisShip = thisState.user.ships.find((x) => x.id === shipId);
    const otherShips = thisState.user.ships.filter((x) => x !== thisShip);

    saveState({
      user: {
        ...thisState.user,
        ships: [
          ...otherShips,
          {
            ...thisShip,
            ...thisState.ship,
          },
        ],
      },
    });
  };
</script>

<div class="card">
  <div>
    <span>
      <button on:click={getMarket}>fetch</button>
      Marketplace
    </span>
  </div>
  {#if items.length > 0}
    <div>
      <span />
      <span class="right">Available</span>
      <span class="right">Volume</span>
      <span class="right">Price</span>
    </div>
    {#each items as item}
      <div>
        <span class="nowrap">
          <button on:click={() => buyGood(item.symbol)}>buy</button>
          {item.symbol}
        </span>
        <span class="right">{item.quantityAvailable}</span>
        <span class="right">{item.volumePerUnit}</span>
        <span class="right">{item.pricePerUnit}</span>
      </div>
    {/each}
  {/if}
</div>

<style>
  .card {
    min-width: 400px;
  }

  .card div {
    display: flex;
    align-items: center;
  }

  .card div span {
    flex: 1;
  }

  .card div span:first-of-type {
    flex: 2;
  }

  .right {
    text-align: right;
  }

  .nowrap {
    white-space: nowrap;
  }
</style>
