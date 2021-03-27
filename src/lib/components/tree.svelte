<script context="module">
  const state = {};
</script>

<script>
  export let tree = {};

  if(state[tree.id] === undefined) {
    state[tree.id] = true;
  }

  $: children = tree.children;
  $: expanded = state[tree.id];

  const toggleExpansion = () => {
    expanded = state[tree.id] = !state[tree.id];
  };
</script>

<ul>
  <li>
    <span>
      {#if children.length > 0}
        <span class="arrow" on:click={toggleExpansion} class:expanded>&#x25b6</span>
        {tree.label}
      {/if}

      {#if tree.value}
        {tree.label}: {tree.value}
      {/if}
      
      {#if expanded}
        {#each children as child}
          <svelte:self tree={child} />
        {/each}
      {/if}
    </span>
  </li>
</ul>

<style>
  ul {
    margin: 0;
    list-style: none;
    padding-left: 1.2rem;
  }

  .arrow {
    cursor: pointer;
    display: inline-block;
    user-select: none;
  }

  .expanded {
    transform: rotate(90deg);
  }
</style>
