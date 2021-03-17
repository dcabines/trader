<script context="module">
  const _expansionState = { };
</script>

<script>
  export let tree;
  $: {
    const { label, children } = tree;
    let expanded = _expansionState[label] || false;
    
    const toggleExpansion = () => {
      expanded = _expansionState[label] = !expanded;
    };
    
    arrowDown = expanded;
  }
</script>

<ul>
  <li>
    {#if children}
      <span on:click={toggleExpansion}>
        <span class="arrow" class:arrowDown>&#x25b6</span>
        {label}
      </span>
      {#if expanded}
        {#each children as child}
          <svelte:self tree={child} />
        {/each}
      {/if}
    {:else}
      <span>
        <span class="no-arrow" />
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
  .arrowDown {
    transform: rotate(90deg);
  }
</style>
