<script context="module">
  const makeTree = (id, label, obj) => ({
    id,
    label,
    value: null,
    children: Object.keys(obj).map((key) => {
      const newId = `${id}::${key}`;
      const value = obj[key];

      if (value !== null && typeof value === "object") {
        return makeTree(newId, key, value);
      }

      return { id: newId, label: key, value, children: [] };
    }),
  });
</script>

<script>
  import Tree from "./tree.svelte";
  export let label;
  export let data;
  const stateTree = (data) => makeTree(null, label, data);

  $: tree = stateTree(data);
</script>

<div class="card">
  <Tree {tree} />
</div>
