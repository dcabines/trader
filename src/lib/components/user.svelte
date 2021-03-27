<script>
  import * as api from "../traders/api";
  import { user } from "../traders/state";
</script>

{#if $user.username}
  <div class="card">
    <div>
      <button on:click={api.getUser}>account</button>
    </div>

    <div>
      <div>
        <span>username</span>
        <span>{$user.username}</span>
      </div>
      <div>
        <span>token</span>
        <span>{$user.token}</span>
      </div>
      <div>
        <span>credits</span>
        <span>{$user.credits}</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .card {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card div {
    flex: 1;
  }

  .card div div {
    display: flex;
    justify-content: space-between;
  }
</style>
