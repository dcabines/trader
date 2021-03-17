<script>
  import { saveState } from '../traders/state';
    const login = () => fetch("/login");

  const fetchState = () =>
    fetch("/state.json")
      .then((res) => res.json())
      .then(saveState);
</script>

<button on:click={login}>login</button>
<button on:click={fetchState}>state</button>
