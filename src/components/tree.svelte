<script context="module">
  const state = {};
</script>

<script>
  export let parent;
  export let tree;
  const label = tree.label;
  const key = parent ? `${parent}::${label}` : label;
  let expanded = state[key] || false;

  $: children = tree.children;

  const toggleExpansion = () => {
    expanded = state[key] = !state[key];
  };
</script>

<ul>
  <li>
    {#if children}
      <span on:click={toggleExpansion}>
        <span class="arrow" class:expanded>&#x25b6</span>
        {label}
      </span>
      {#if expanded}
        {#each children as child}
          <svelte:self parent={key} tree={child} />
        {/each}
      {/if}
    {:else}
      <span class="no-arrow">
        {label}
      </span>
    {/if}
  </li>
</ul>

<style>
  ul {
    margin: 0;
    list-style: none;
    padding-left: 1.2rem;
    user-select: none;
  }

  .no-arrow {
    padding-left: 1rem;
  }

  .arrow {
    cursor: pointer;
    display: inline-block;
  }

  .expanded {
    transform: rotate(90deg);
  }
</style>
