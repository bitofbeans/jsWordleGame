<script>
    import {ANIMATE } from "../util"
    import Switch from "./Switch.svelte";
    let checked = true
</script>

<nav>
    <!-- Left Section Items -->
    <section>
        <Switch bind:checked={$ANIMATE} label="animation?" />
    </section>

    <!-- Center Section Items -->
    <section>
        <h1>Wordle</h1>
    </section>

    <!-- Right Section Items -->
    <section />
</nav>

<style>
    nav {
        padding: 0 0.5rem;
        display: flex;
        background-color: rgb(26, 27, 29);
        border-bottom: 1px solid rgb(75, 75, 75);
    }
    nav section {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    nav section h1 {
        margin: 0;
        font-size: 2.2rem;
        height: 50px;
        grid-column: 5; /* in center */
    }
</style>
