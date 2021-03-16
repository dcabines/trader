<script>
  import { json } from "../traders/state";
  import * as actions from "../traders/actions";

  const login = () =>
    actions.logIn({
      username: "temp-123",
      token: "f679f118-621c-49a6-af70-27f616f8d9c5",
    });
</script>

<button on:click={login}>login</button>
<button on:click={actions.startup}>startup</button>

<pre>{$json}</pre>

