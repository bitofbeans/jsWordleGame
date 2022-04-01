<script>
    import { onMount } from "svelte";
    export let special;
    let row;
    let animation;
    $: special === "shake" && (animation = "shake");

    onMount(() => {
        row.addEventListener("animationend", ({ animationName }) => {
            if (animation === "shake" && animationName.includes("shake")) {
                animation = "";
            }
        });
    });
</script>

<div class="board-row" bind:this={row} data-animation={animation}>
    <slot />
</div>

<style>
    @keyframes shake {
        10%,
        90% {
            transform: translate(-1px);
        }
        20%,
        80% {
            transform: translate(2px);
        }
        30%,
        50%,
        70% {
            transform: translate(-4px);
        }
        40%,
        60% {
            transform: translate(4px);
        }
    }
    .board-row[data-animation="shake"] {
        animation-name: shake;
        animation-duration: 750ms;
        animation-timing-function: ease-in-out;
    }
    .board-row {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 5px;
        -ms-grid-columns: repeat(5, 1fr);
        border-radius: 2.5px;
    }
</style>
