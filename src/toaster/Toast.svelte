<script>
    import { fade } from "svelte/transition";
    export let type;
    export let content;
</script>

{#if type == "small"}
    <div class="toast-{type}" out:fade={{ duration: 150 }}>
        {content}
    </div>
{:else}
    <!-- else content here -->
{/if}

<style>
    .toast-small {
        position: relative;
        font-size: 1em;
        font-weight: bold;
        background-color: white;
        color: #222;
        padding: 0.75em 1em;
        z-index: 10;
        width: max-content;
        border-radius: 0.3rem;
        margin-top: 1rem;
        opacity: 0.85;
    }
    .toast-big {
        position: relative;
    }
</style>
