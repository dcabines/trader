<script>
  export let location = {};

  $: items = location.marketplace.sort((a, b) =>
    a.pricePerUnit < b.pricePerUnit ? -1 : 1
  );
</script>

<div class="card">
  <div>
    <span>{location.name}</span>
    <span>{location.symbol} {location.type}</span>
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
        <span>{item.symbol}</span>
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
</style>
