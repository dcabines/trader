<script context="module">
  const makeTree = (label, obj) => ({
    label,
    children: Object.keys(obj).map((key) => {
      const value = obj[key];

      if (typeof value !== "object") {
        return { label: `${key}: ${value}` };
      }

      return makeTree(key, value);
    }),
  });
</script>

<script>
  import Tree from "./tree.svelte";
  export let data;
  const stateTree = (data) => makeTree("state", data);

  $: tree = stateTree(data);
</script>

<div class="card">
  <Tree {tree} />
</div>
