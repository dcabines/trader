<script>
  import { marketplace } from "../traders/state";
  import { marketReport } from "../traders/report";
</script>

{#if $marketplace.length > 0}
  <div class="card">
    <pre>{marketReport($marketplace).join(`\n`)}</pre>
  </div>
{/if}

<style>
  .card {
    border: 1px solid #ddd;
    border-radius: 3px;
    margin: 10px 0;
    padding: 10px;
  }
</style>
