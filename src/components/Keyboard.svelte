<script>
    import Key from "./Key.svelte";

    const keys1 = [..."QWERTYUIOP"];
    const keys2 = [..."ASDFGHJKL"];
    const keys3 = [..."ZXCVBNM"];
</script>

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
        <Key bigKey val="ENTER" />
        {#each keys3 as key}
            <Key val={key} />
        {/each}
        <Key bigKey val="ENTER" />
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
