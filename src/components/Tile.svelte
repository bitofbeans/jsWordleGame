<script>
    import { board } from "../util";
    import { onMount } from "svelte";
    export let row;
    export let letterPos;
    export let state = "";
    let tile;
    let letter;
    let animation;
    let tileState = "";

    // get letter
    $: letter = $board[row][letterPos];

    // when state changes to something truthy, set animation
    $: state && (animation = "flip-in");

    onMount(() => {
        tile.addEventListener("animationend", ({ animationName, target }) => {
            // when flip-in animation ends, set animation to flip-out
            if (animationName.includes("flip-in")) {
                animation = "flip-out";
                tileState = state;
            }
            // when flip-out animation ends, remove animation
            if (animationName.includes("flip-out")) {
                animation = "";
            }
        });
    });
</script>

<!-- prettier-ignore -->
<div
    bind:this={tile}
    class={`tile`}
    class:tile-full={letter !== "" && state === ""}
    data-state={tileState || ""}
    data-animation={animation ||""}
>
    {letter}
</div>

<style lang="scss">
    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes pop-in {
        0% {
            opacity: 0;
        }
        40% {
            transform: scale(1.2);
            opacity: 0.75;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes flip-in {
        0% {
            transform: rotateX(0deg);
        }
        100% {
            transform: rotateX(-90deg);
        }
    }

    @keyframes flip-out {
        0% {
            transform: rotateX(-90deg);
        }
        100% {
            transform: rotateX(0deg);
        }
    }

    @mixin delay {
        @for $i from 1 through 4 {
            &:nth-child(#{$i + 1}) {
                animation-delay: $i * 300ms;
            }
        }
    }
    .tile {
        text-transform: uppercase;
        z-index: 5;
        position: relative;
        border: 2px solid rgba(84, 91, 94, 0.8);
        font-size: 28px;
        font-weight: bolder;
        display: grid;
        align-items: center;
        justify-items: center;
        box-sizing: border-box;
    }
    .tile.tile-full.tile[data-state=""] {
        border: 2px solid #818384;
        animation: pop-in 150ms ease;
    }

    .tile[data-state="present"] {
        z-index: 5;
    }

    .tile[data-state="correct"] {
        background-color: #538d4e;
        border: 2px solid rgba(0, 0, 0, 0.2);
    }
    .tile[data-state="present"] {
        background: repeating-linear-gradient(
            45deg,
            #b59f3b,
            #b59f3b 10px,
            #bda63e 10px,
            #bda63e 20px
        );
        border: none;
    }

    .tile[data-state="absent"] {
        background-color: #3a3a3c;
        border: none;
    }

    .tile[data-animation="flip-in"] {
        border: 2px solid #818384;
        animation-name: flip-in;
        animation-duration: 250ms;
        animation-timing-function: ease-in;
        @include delay;
    }

    .tile[data-animation="flip-out"] {
        animation-name: flip-out;
        animation-duration: 250ms;
        animation-timing-function: ease-in;
    }

    @media screen and (max-height: 550px) {
        .tile {
            font-size: 1rem;
        }
    }
</style>
