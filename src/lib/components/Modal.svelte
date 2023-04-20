<script lang="ts">
    export let dialog:HTMLDialogElement;
</script>
<dialog bind:this={dialog}>
    <article>
        <header >
             <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <a aria-label="Close" class="customClose"  on:click={()=>dialog.close()}><i class="fa solid fa-close"></i></a>
            <slot name="header"></slot>
        </header>
        <slot name="body"><!-- optional fallback --></slot>
    </article>
</dialog>
<style lang="scss">
    article{
        width: 100%;
        max-width: 800px;
        header{
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            justify-content: space-between;
            .customClose, i{
                text-decoration: none;
                border-radius: 50%;
                padding: 20px;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                font-weight: bolder;
                font-size: 20px;
                justify-content: center;
            }
            .customClose{
                // box-shadow: inset 0 0 5px 1px var(--primary),0 0 5px -2px var(--primary);
                border:1px solid var(--primary);
            }
            .customClose:hover{
                background-color: var(--primary);
                color:var(--primary-inverse) !important;
            }
        }
    }
</style>
