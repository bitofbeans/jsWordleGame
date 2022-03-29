<script>
    import { onMount } from "svelte";
    import { boardContainerElem } from "../util";

    // Get Board Container element
    let boardContainer;
    onMount(() => {
        boardContainerElem.set(boardContainer);
    });
</script>

<div class="board-container" bind:this={boardContainer}>
    <slot />
</div>

<style>
    .board-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        overflow: hidden;
        width: 100%;
    }
</style>
