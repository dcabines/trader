<script>
  import { state, saveState } from "../traders/state";
  import * as api from "../traders/api";

  export let shipId;
  $: ship = $state.user.ships.find(x => x.id === shipId);

  const sellGood = async (good) => {
    await api.sellGood(good, 1);
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

{#if ship.cargo.length > 0}
  <div class="card">
      <span>{ship.spaceAvailable}/{ship.maxCargo} Cargo</span>
    <div>
      <span></span>
      <span class="right">Quantity</span>
      <span class="right">Volume</span>
    </div>
    {#each ship.cargo as item}
      <div>
        <span>
          <button on:click={() => sellGood(item.good)}>sell</button>
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
