<script>
  import state from '$lib/state';

  export let ship = {};
  $: marketplace = $state.location.marketplace || [];

  $: items = marketplace.sort((a, b) =>
    a.pricePerUnit < b.pricePerUnit ? -1 : 1
  );

  const getMarket = () => state.getMarket(ship.location);

  const buyGood = async (symbol, quantity) => {
    await state.buyGood(ship.id, symbol, quantity);
    await state.getMarket(ship.location);
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
    {#each items as item}
      <div>
        <span>
          <button on:click={() => buyGood(item.symbol, 1)}>1</button>
          <button on:click={() => buyGood(item.symbol, 5)}>5</button>
          <button on:click={() => buyGood(item.symbol, 10)}>10</button>
          <button on:click={() => buyGood(item.symbol, 50)}>50</button>
          <button on:click={() => buyGood(item.symbol, 100)}>100</button>
          {item.symbol}
        </span>
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
