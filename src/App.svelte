<!-- Main App-->
<script>
    import Board from "./components/Board.svelte";
    import BoardContainer from "./components/BoardContainer.svelte";
    import Keyboard from "./components/Keyboard.svelte";
    
    // for testing
    import { wordSet, correctWord } from "./util";
    console.log($wordSet);
    console.log($correctWord);
</script>

<main>
    <nav>
        <h1>Wordle</h1>
    </nav>

    <div class="game-container">
        <BoardContainer>
            <Board />
        </BoardContainer>
        <Keyboard />
    </div>
</main>

<style>
    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes shake {
        10%,
        90% {
            transform: translate(-1px, 0);
        }

        30%,
        80% {
            transform: translate(2px, 0);
        }

        50%,
        70% {
            transform: translate(-4px, 0);
        }

        40%,
        60% {
            transform: translate(4px, 0);
        }
    }

    @keyframes drop-in {
        0% {
            opacity: 0;
            transform: translate(0, -100px);
        }
        100% {
            opacity: 1;
            transform: translate(0, 50px);
        }
    }

    @keyframes fade-out-down {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translate(0, 50px);
        }
    }

    main {
        height: 100%;
        text-align: center;
        color: white;
    }

    nav {
        background-color: rgb(26, 27, 29);
        border-bottom: 1px solid rgb(75, 75, 75);
    }
    nav h1 {
        margin: 0;
        font-size: 2.2rem;
        height: 50px;
    }

    .game-container {
        max-width: 500px;
        margin: auto;
        align-items: center;
        display: flex;
        flex-direction: column;
        height: calc(100% - 60px);
    }
    /*

    .gameOver :is(h1, h2, h3) {
        margin: 1rem 0;
    }

    .gameOver {
        padding: 1rem 1.5rem;
        position: absolute;
        z-index: 10;
        border-radius: 1rem;
        background-color: rgba(26, 27, 29, 0.8);
        animation: drop-in 300ms ease 1s;
        animation-fill-mode: backwards;
        transform: translate(0, 50px);
    }
    .correct-word-txt {
        color: #c6ffc1;
        display: inline;
    }
    .win-txt {
        color: #ffe882;
        display: inline;
    }
    .attempt-txt {
        color: #e6e6e6;
        display: inline;
    }
    .lose-txt {
        color: #ffacac;
        display: inline;
    }

    .toast {
        z-index: 7;
        position: absolute;
        background-color: rgba(255, 255, 255, 0.8);
        color: black;
        padding: 10px;
        border-radius: 5px;
    }

    .toast.toast-visible {
        animation: fade-in 500ms, 
               shake 500ms ease, 
               fade-out-down 500ms ease-in 1s forwards;
    }
    @media screen and (max-height: 550px) {
        .tile {
            font-size: 1rem;
        }
        /* .key {
        width: 30px;
        height: 42px;
        line-height: 42px;
    }
    .key-big {
        font-size: 0.8rem;
    }
    .board {
        width: 200px;
        height: 240px;
    } 
    */
</style>
