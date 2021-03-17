<script>
  import * as api from "../traders/api";
  import { status, user, error } from "../traders/state";
</script>

<div>
  <div class="card">
    <button on:click={api.getStatus}>status</button>
    <button on:click={api.getUser}>user</button>
    <button on:click={api.getSystems}>system</button>
    <button on:click={api.flightPlans}>flight plans</button>
    <button on:click={api.getLoans}>loans</button>
    <button on:click={api.getShips}>ships</button>
  </div>

  {#if $error}
    <div class="card">
      {$error.message}
    </div>
  {/if}

  {#if $user.username}
    <div class="card">
      <div>username: {$user.username}</div>
      <div>credits: {$user.credits}</div>
    </div>
  {/if}

  {#if $status}
    <div class="card">
      {$status}
    </div>
  {/if}
</div>

<style>
  .card {
    border: 1px solid #ddd;
    border-radius: 3px;
    margin: 10px 0;
    padding: 10px;
    min-width: 0;
  }
</style>
