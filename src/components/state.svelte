<script>
  import { derived } from "svelte/store";
  import { state } from "../traders/state";
  import Tree from "../components/tree.svelte";

  const makeTree = (label, obj) => {
    console.log(obj);
    return ({
    label,
    children: Object.keys(obj).map(key => ({ label: key }))
  });
  };

  // Object.keys(obj).map(key => {
  //     const value = obj[key];
  //     console.log(key, value)
  //     if(typeof(value) === 'string') {
  //       return { label: `${key}: ${value}` };
  //     }

  //     return makeTree(key, value);
  //   })

  const json = derived(state, ($state) => JSON.stringify($state, null, "  "));
  const tree = derived(state, ($state) => makeTree('state', $state));
</script>

<div>
  <div class="card">
    <Tree tree={$tree} />
  </div>

  <div class="card">
    <pre>{$json}</pre>
  </div>
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
