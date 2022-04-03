<!-- Main App-->
<script>
    import Board from "./board/Board.svelte";
    import BoardContainer from "./board/BoardContainer.svelte";
    import Keyboard from "./keyboard/Keyboard.svelte";
    import Toast from "./toaster/ToastContainer.svelte";
</script>

<main>
    <nav>
        <h1>Wordle</h1>
    </nav>

    <div class="game-container">
        <Toast />
        <BoardContainer>
            <Board />
        </BoardContainer>
        <Keyboard />
    </div>
</main>

<style>
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
</style>
