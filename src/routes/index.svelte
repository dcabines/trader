<script>
  import * as api from '../traders/api';
  let token = '';

  async function login() {
    await fetch('/login');
    const state = await fetch('/state.json').then(res => res.json());
    console.log(state);
    token = state.token;
  }
</script>

<button on:click="{login}">
  login
</button>

<pre>{token}</pre>

<button on:click="{api.getStatus}">status</button>
