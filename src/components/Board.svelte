<!-- Game Board -->
<script>
    import { onMount } from "svelte";
    import Tile from "./Tile.svelte";
    import { board, boardElem } from "../util";

    // Get Board element
    let boardBinding;
    onMount(() => {
        boardElem.set(boardBinding);
    });

    
</script>

<div class="board" bind:this={boardBinding}>
    {#each $board as row}
        <div class="board-row">
            {#each row as tile}
                <Tile />
            {/each}
        </div>
    {/each}
</div>

<style>
    .board {
        display: grid;
        grid-template-rows: repeat(6, 1fr);
        grid-gap: 5px;
        padding: 10px;
        box-sizing: border-box;
    }

    .board-row {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 5px;
    }
</style>
