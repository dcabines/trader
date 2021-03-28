<script>
  import * as api from '$lib/traders/api';
  import { state, loggedIn } from '$lib/traders/state';
  $: user = $state.user;
  $: token = $state.token;
</script>

{#if $loggedIn}
  <div class="card">
    <div>
      <button on:click={api.getUser}>account</button>
      <span style="white-space:nowrap;">{token}</span>
    </div>

    <div>
      <span>username</span>
      <span>{user.username}</span>
    </div>

    <div>
      <span>credits</span>
      <span>{user.credits}</span>
    </div>
  </div>
{/if}

<style>
  .card div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
