<script>
  import { slide } from 'svelte/transition';
  import state from '$lib/state';
  $: message = $state.error && $state.error.message;
</script>

{#if message}
  <div class="card" on:click={state.clearError} transition:slide="{{delay: 250, duration: 300 }}">
    {message}
  </div>
{/if}

<style>
  .card {
    border-color: red;
    cursor: pointer;
  }
</style>
