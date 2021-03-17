<script>
  import * as api from "../traders/api";
  import Game from "../components/game.svelte";
  import Ships from "../components/ships.svelte";
  import State from "../components/state.svelte";

  api.logIn({
    username: "temp-123",
    token: "f679f118-621c-49a6-af70-27f616f8d9c5",
    shipId: "ckmc20mtl161926515s653n6juj5",
  });
</script>

<div class="content">
  <Game />
  <Ships />
  <State />
</div>

<style>
  .content {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
</style>
