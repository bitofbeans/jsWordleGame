<script>
    import { handleKeyDown } from "../util";

    export let val;
    export let bigKey = false;

    const handleKeyPressed = () => {
        if (val === "enter") $handleKeyDown({ key: "Enter" });
        if (val === "del") $handleKeyDown({ key: "Backspace" });
        else $handleKeyDown({ key: val });
    };
</script>

<div class="key{bigKey ? ' key-big' : ''}" on:click={handleKeyPressed}>
    {val}
</div>

<style>
    .key {
        font-size: 1.2rem;
        flex: 1;
        height: 58px;
        margin: 2px;
        border-radius: 4px;
        line-height: 58px;
        background-color: rgb(52, 57, 59);
        background: #777a7a;
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        transition: background 500ms;
        transition-delay: 250ms;
        text-transform: uppercase;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

    .key-big {
        flex: 2;
    }

    .key-correct {
        background: #538d4e;
    }
    .key-present {
        background: #b59f3b;
    }
    .key-absent {
        background: rgb(77, 83, 86);
    }
</style>
