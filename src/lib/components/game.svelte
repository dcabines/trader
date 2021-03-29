<script>
  import state from '$lib/state';
  $: status = $state.status
</script>

<div class="card">
  <div>
    <button on:click={state.getStatus}>fetch</button>
    <span>Status</span>
  </div>

  {#if status}
    {status}
  {/if}
</div>
