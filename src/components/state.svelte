<script>
  import { derived } from 'svelte/store';
  import { state } from "../traders/state";
  export const json = derived(state, $state => JSON.stringify($state, null, '  '));
</script>

<div class="card">
  <pre>{$json}</pre>
</div>

<style>
  .card {
    border: 1px solid #ddd;
    border-radius: 3px;
    margin: 10px 0;
    padding: 10px;
    min-width: 0;
  }

  pre {
    margin: 0;
    overflow: auto;
  }
</style>
