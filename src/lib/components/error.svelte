<script>
  import { slide } from 'svelte/transition';
  import { state, saveState } from '$lib/traders/state';

  const clearError = () => saveState({ error: {} });
</script>

{#if $state.error.message}
  <div class="card" on:click={clearError} transition:slide="{{delay: 250, duration: 300 }}">
    {$state.error.message}
  </div>
{/if}

<style>
  .card {
    border-color: red;
    cursor: pointer;
  }
</style>
