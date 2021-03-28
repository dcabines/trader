<script>
  import * as api from '$lib/traders/api';
  import { saveState, state } from "$lib/traders/state";

  $: flightPlan = $state.flightPlan;
  const startLength = $state.flightPlan.timeRemainingInSeconds; 
  $: remaining = startLength - flightPlan.timeRemainingInSeconds;
  $: percent = remaining / startLength * 100;
  $: ship = $state.user.ships.find((x) => x.id === flightPlan.ship);
  $: otherShips = $state.user.ships.filter((x) => x !== ship);

  const countdown = setInterval(() => {
    saveState({
      flightPlan: {
        ...flightPlan,
        timeRemainingInSeconds: flightPlan.timeRemainingInSeconds - 1,
      },
    });

    if (flightPlan.timeRemainingInSeconds <= 0) {
      clearInterval(countdown);

      saveState({
        flightPlan: {},
        user: {
          ...$state.user,
          ships: [
            ...otherShips,
            {
              ...ship,
              location: flightPlan.destination,
            },
          ],
        },
      });

      api.getMarket(flightPlan.destination);
    }
  }, 1000);
</script>

{#if flightPlan}
  <div class="card">
    <div class="progress">
      <div class="bar" style="height:24px;width:{100-percent}%" />
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
      <span>Time Remaining In Seconds</span>
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
    background: white;
  }
</style>
