<script>
    import Toast from "./Toast.svelte";
    import { toasts } from "../util";
</script>

<div class="toaster">
    {#each $toasts as toast}
        <Toast type={toast.type} content={toast.content} />
    {/each}
</div>

<style>
    @keyframes fade-out {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    .toaster {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: max-content;
        flex-direction: column;
    }
</style>
