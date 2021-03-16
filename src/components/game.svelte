<script>
  import * as api from '../traders/api';
  import { status } from '../traders/state';
</script>

<div class="card">
  <button on:click={api.getStatus}>status</button>
  <button on:click={api.getUser}>user</button>
  <button on:click={api.getSystems}>system</button>
  <button on:click={api.getLoans}>loans</button>
  <button on:click={api.getShips}>ships</button>
  <div>{$status}</div>
</div>

<style>
  .card {
    border: 1px solid #ddd;
    border-radius: 3px;
    margin: 10px 0;
    padding: 10px;
  }
</style>