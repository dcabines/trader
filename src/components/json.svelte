<script>
  export let data;
  $: json = JSON.stringify(data, null, "  ");
</script>

<div class="card">
  <pre>{json}</pre>
</div>

<style>
  pre {
    margin: 0;
    overflow: auto;
  }
</style>
