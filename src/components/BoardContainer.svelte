<script>
    import { onMount } from "svelte";
    import { boardElem } from "../util";

    let boardContainer;
    const resizeBoard = () => {
        var width = Math.min(Math.floor(boardContainer.clientHeight * (5 / 6)), 350);
        var height = 6 * Math.floor(width / 5);
        $boardElem.style.width = `${width}px`;
        $boardElem.style.height = `${height}px`;
    };
    onMount(resizeBoard);

</script>
<svelte:window on:resize={resizeBoard} />

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
