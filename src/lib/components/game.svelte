<script>
  import * as api from "../traders/api";
  import { state } from "../traders/state";
</script>

{#if $state.error.message}
  <div class="card error">
    {$state.error.message}
  </div>
{/if}

<div class="card">
  <div>
    <button on:click={api.getStatus}>fetch</button>
    <span>Status</span>
  </div>

  {#if $state.status}
    {$state.status}
  {/if}
</div>

<style>
  .error {
    border-color: red;
  }
</style>
