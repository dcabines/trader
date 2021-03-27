<script>
  import * as api from "../traders/api";

  let username = "temp-123-01";
  let token = "98002005-e53b-4076-9e79-b8a84bff23ac";
  let shipId = "ckmmtoqga48522015s6hgmquamt";

  const createToken = () => {
    api.createToken(username);
  };

  const logIn = () => {
    api.logIn({ username, token, shipId });
  };
</script>

<div class="card">
  <div>
    <button on:click={createToken} disabled={!username}>create</button>
    <input bind:value={username} />
  </div>

  <div>
    <button on:click={logIn} disabled={!username}>log in</button>
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
