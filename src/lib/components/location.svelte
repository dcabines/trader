<script>
  export let location;
</script>

<div class="card">
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

<style>
  .card div {
    display: flex;
    justify-content: space-between;
  }

  .card span:first-child {
    flex: 1;
  }
</style>