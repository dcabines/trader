<script>
  import * as api from '$lib/traders/api';
  import { state } from '$lib/traders/state';
</script>

<div class="card">
  <div>
    <button on:click={api.getStatus}>fetch</button>
    <span>Status</span>
  </div>

  {#if $state.status}
    {$state.status}
  {/if}
</div>
