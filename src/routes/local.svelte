<script>
  import { json, ships } from "../traders/state";
  import * as api from "../traders/api";
  import Game from "../components/game.svelte";
  import Ship from "../components/ship.svelte";

  api.logIn({
    username: "temp-123",
    token: "f679f118-621c-49a6-af70-27f616f8d9c5",
    shipId: "ckmc20mtl161926515s653n6juj5",
  });
</script>

<div class="content">
  <div>
    <Game />
  </div>

  <div>
    {#if $ships.length > 0}
      {#each $ships as ship}
        <Ship shipId={ship.id} />
      {/each}
    {/if}
  </div>

  <div class="card">
    <pre>{$json}</pre>
  </div>
</div>

<style>
  .content {
    display: flex;
    gap: 10px;
  }
  .content > div {
    flex: 1;
  }

  .card {
    border: 1px solid #ddd;
    border-radius: 3px;
    margin: 10px 0;
    padding: 10px;
  }
</style>
