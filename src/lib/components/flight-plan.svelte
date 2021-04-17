<script>
  import state from '$lib/state';
  $: flightPlan = $state.flightPlan;
</script>

{#if flightPlan.id}
  <div class="card">
    <div class="progress">
      <div class="bar" style="width:{flightPlan.percentRamaining}%" />
    </div>
    <div>
      <span>ID</span>
      <span>{flightPlan.id}</span>
    </div>
    <div>
      <span>Ship</span>
      <span>{flightPlan.ship}</span>
    </div>
    <div>
      <span>Fuel Consumed</span>
      <span>{flightPlan.fuelConsumed}</span>
    </div>
    <div>
      <span>Fuel Remaining</span>
      <span>{flightPlan.fuelRemaining}</span>
    </div>
    <div>
      <span>Seconds Remaining</span>
      <span>{flightPlan.timeRemainingInSeconds}</span>
    </div>
    <div>
      <span>Arrives At</span>
      <span>{new Date(flightPlan.arrivesAt).toLocaleTimeString()}</span>
    </div>
    <div>
      <span>Destination</span>
      <span>{flightPlan.destination}</span>
    </div>
    <div>
      <span>Departure</span>
      <span>{flightPlan.departure}</span>
    </div>
    <div>
      <span>Distance</span>
      <span>{flightPlan.distance}</span>
    </div>
  </div>
{/if}

<style>
  .card {
    min-width: 400px;
  }

  .card div {
    display: flex;
    justify-content: space-between;
  }

  .card span:first-child {
    flex: 1;
  }

  .progress {
    border: 1px solid;
    margin-bottom: 10px;
  }

  .progress .bar {
    height: 24px;
    background: white;
  }
</style>
