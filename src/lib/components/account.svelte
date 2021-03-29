<script>
  import state from '$lib/state';

  let username = $state.user.username;
  let token = $state.token;

  const createToken = async () => {
    token = await state.createToken(username);
  };

  const logIn = () => state.logIn(username, token);
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

  .card div > button {
    flex: none;
    width: 60px;
  }

  .card div > input {
    flex: 1;
  }
</style>
