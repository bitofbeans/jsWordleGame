<script>
    import { fade } from "svelte/transition";
    export let content;
</script>

<div class="toast" out:fade={{ duration: 150 }}>
    {content}
</div>

<style>
    .toast {
        position: relative;
        font-size: 1em;
        font-weight: bold;
        background-color: white;
        color: #222;
        padding: 0.75em 1em;
        z-index: 10;
        border-radius: 0.3rem;
        margin-top: 1rem;
        opacity: 0.85;
    }
</style>
