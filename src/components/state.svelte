<script>
  import { state } from "../traders/state";
  import Json from "../components/json.svelte";
  import Tree from "../components/tree-view.svelte";
  $: data = $state;
</script>

<div>
  <Tree {data} />
  <Json {data} />
</div>
