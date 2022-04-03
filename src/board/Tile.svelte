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

    $: letter = $board[row][letterPos];

    // when letter changes to something truthy, set animation
    $: letter && (animation = "pop-in");

    // when state changes to something truthy, set animation
    $: state && (animation = "flip-in");

    // for resetting
    $: state == "" && (tileState = "")
    
    // if state changes to this, dont animate
    $: state === "guessed-correct" && ((animation = ""), (tileState = state));

    onMount(() => {
        tile.addEventListener("animationend", ({ animationName }) => {
            if (animation == "pop-in" && animationName.includes("pop-in")) {
                // when pop-in animation ends, remove animation
                animation = "";
            } else if (animation == "flip-in" && animationName.includes("flip-in")) {
                // when flip-in animation ends, set animation to flip-out
                animation = "flip-out";
                tileState = state;
            } else if (animation == "flip-out" && animationName.includes("flip-out")) {
                // when flip-out animation ends, remove animation
                animation = "";
            }
        });
    });
</script>

<div
    bind:this={tile}
    class={`tile`}
    class:tile-full={letter !== ""}
    data-state={tileState}
    data-animation={animation}
>
    {letter}
</div>

<style lang="scss">
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

    .tile {
        // transform-style: preserve-3d;
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
    .tile-full {
        border: 2px solid #818384;
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
    .tile[data-state="guessed-correct"] {
        transition: background-color 0.5s, border 0.5s, box-shadow 0.5s;
        background-color: #6cb966;
        border: 2px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0px 0px 10px 2px #3ebd4c;
    }

    .tile[data-animation="pop-in"] {
        animation: pop-in 150ms ease;
    }
    .tile[data-animation="flip-in"] {
        animation-name: flip-in;
        animation-duration: 250ms;
        animation-timing-function: ease-in;
        // animation delays
        @for $i from 1 through 4 {
            &:nth-child(#{$i + 1}) {
                animation-delay: $i * 300ms;
            }
        }
    }
    .tile[data-animation="flip-out"] {
        animation-name: flip-out;
        animation-duration: 250ms;
        animation-timing-function: ease-out;
    }

    @media screen and (max-height: 550px) {
        .tile {
            font-size: 1rem;
        }
    }
</style>
