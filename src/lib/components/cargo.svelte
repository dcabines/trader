<script>
  import state from "$lib/state";

  export let shipId;

  $: ship = $state.user.ships.find((x) => x.id === shipId);

  const sellGood = async (item) => {
    await state.sellGood(ship.id, item.good, item.quantity);
    await state.getMarket(ship.location);
  };
</script>

{#if ship.cargo.length > 0}
  <div class="card">
    <span>{ship.spaceAvailable}/{ship.maxCargo} Cargo</span>
    <div>
      <span />
      <span class="right">Quantity</span>
      <span class="right">Volume</span>
    </div>
    {#each ship.cargo as item}
      <div>
        <span>
          {#if ship.location}
            <button on:click={() => sellGood(item)}>sell</button>
          {/if}
          {item.good}
        </span>
        <span class="right">{item.quantity}</span>
        <span class="right">{item.totalVolume}</span>
      </div>
    {/each}
  </div>
{/if}

<style>
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
</style>
