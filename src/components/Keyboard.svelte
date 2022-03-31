<script>
    import Key from "./Key.svelte";

    const keys1 = [..."qwertyuiop"];
    const keys2 = [..."asdfghjkl"];
    const keys3 = [..."zxcvbnm"];

    import { handleKeyDown } from "../util";
</script>

<svelte:window on:keydown={$handleKeyDown} />

<div class="keyboard">
    <div class="kb-line">
        {#each keys1 as key}
            <Key val={key} />
        {/each}
    </div>

    <div class="kb-line">
        <div class="spacer" />
        {#each keys2 as key}
            <Key val={key} />
        {/each}
        <div class="spacer" />
    </div>

    <div class="kb-line">
        <Key bigKey val="enter" />
        {#each keys3 as key}
            <Key val={key} />
        {/each}
        <Key bigKey val="del" />
    </div>
</div>

<style>
    .spacer {
        flex: 0.5;
    }

    .keyboard {
        width: 100%;
    }

    .kb-line {
        margin: 0 0.25rem;
        display: flex;
    }
</style>
