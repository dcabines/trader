<script>
  import { state } from "$lib/traders/state";
  import * as api from '$lib/traders/api';
  import * as actions from '$lib/traders/actions';

  let username = $state.user.username;
  let token = $state.token;

  const createToken = async () => {
    await api.createToken(username);
    username = $state.user.username;
    token = $state.token;
  };

  const logIn = () => actions.logIn(username, token);
</script>

<div class="card">
  <div>
    <button on:click={createToken}>create</button>
    <input bind:value={username} />
  </div>

  <div>
    <button on:click={logIn}>log in</button>
    <input bind:value={token} />
  </div>
</div>

<style>
  .card div {
    display: flex;
  }

  .card div > * {
    flex: 1;
  }
</style>
