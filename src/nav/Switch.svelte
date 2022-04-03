<script>
    export let label;
    export let checked = false;
</script>

<!-- <div class="switch-container">
    <input id="anim-switch" class="switch" type="checkbox" checked />
    <label for="anim-switch" class="switch-label">{label}</label>
</div> -->

<label for="switch" class="switch-container">
    <input class="checkbox" type="checkbox" name="switch" id="switch" bind:checked />
    <span class="switch" />
    {label}
</label>

<style>
    .switch-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        --transition-speed: 0.15s;
        cursor: pointer;
        color: #999
    }
    .switch-container .checkbox {
        position: absolute;
        width: 0;
        opacity: 0;
        height: 0;
    }
    .switch {
        position: relative;
        box-sizing: border-box;
        display: block;
        width: 1.75rem;
        height: 1rem;
        top:2px;
        border-radius: 1rem;
        border: 1px solid #555;
        transition: background-color var(--transition-speed) ease-in-out,
        border-color var(--transition-speed) ease-in-out;
        margin-right: 0.5rem;
    }
    .switch:before {
        content: "";
        position: absolute;
        display: block;
        /* position: absolute; */
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 100%;
        background-color: #555;
        top: 1px;
        left: 1px;
        /* prettier-ignore */
        transition: background-color var(--transition-speed) ease-in-out,
            border-color var(--transition-speed) ease-in-out, 
            transform var(--transition-speed) ease-in-out;
    }

    .switch-container .checkbox:checked ~ .switch {
        background-color: #28a745;
        border-color: #064f17;
    }
    .switch-container .checkbox:checked ~ .switch:before {
        background-color: white;
        transform: translateX(0.75rem);
    }
    /* .switch-container {
        position: relative;
        display:flex;
        --transition-speed: 0.2s;
    }
    .switch-container .switch-label {
        color: #999999;
        display: flex;
    }
    .switch-container .switch:checked ~ .switch-label:before {
        background-color: #28a745;
        border-color: #064f17;
    }

    .switch-container .switch:checked ~ .switch-label:after {
        background-color: white;
        transform: translateX(1rem);
    }
    .switch-container .switch-label:before {
        content: "";
         position: absolute; 
        display: block;
        box-sizing: border-box;
        background-color: #333;
         left: -2.25rem;
        top: 0.25rem; 
        width: 2rem;
        height: 1rem;
        border-radius: 1rem;
        border: 1px solid #555;
        transition: background-color var(--transition-speed) ease-in-out,
            border-color var(--transition-speed) ease-in-out;
    }
    .switch-container .switch-label:after {
        content: "";
         position: absolute; 
        display: block;
        box-sizing: border-box;
        background-color: #555;
         left: calc(-2.25rem + 2px);
        top: calc(0.25rem + 2px); 
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 100%;
        transition: background-color var(--transition-speed) ease-in-out,
            border-color var(--transition-speed) ease-in-out, 
            transform var(--transition-speed) ease-in-out;
    }
    .switch {
        position: absolute;
        margin: 0;
        padding: 0;
        opacity: 0;
    } */
</style>
