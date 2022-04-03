<!-- Main App-->
<script>
    import Navbar from "./nav/Navbar.svelte";
    import Board from "./board/Board.svelte";
    import BoardContainer from "./board/BoardContainer.svelte";
    import Keyboard from "./keyboard/Keyboard.svelte";
    import Toast from "./toaster/ToastContainer.svelte";
</script>

<main>
    <Navbar />

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

    .game-container {
        max-width: 500px;
        margin: auto;
        align-items: center;
        display: flex;
        flex-direction: column;
        height: calc(100% - 60px);
    }
</style>
