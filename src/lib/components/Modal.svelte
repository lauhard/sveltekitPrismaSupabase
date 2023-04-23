<script lang="ts">
    export let dialog:HTMLDialogElement;
</script>
<dialog bind:this={dialog}>
    <article>
        <header >
             <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <div>
                <a aria-label="Close" class="customIcon" on:click={()=>dialog.close()}><i class="fa solid fa-close"></i></a>
                <a aria-label="Reset" class="customIcon" on:click={()=>dialog.getElementsByTagName("form")[0].reset()}><i class="fa solid fa-refresh"></i></a>
            </div>

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
            div{
                display: flex;
                flex-direction: row;
            }
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            justify-content: space-between;
            .customIcon, i{
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
            .customIcon{
                border:1px solid var(--primary);
            }
            .customIcon:hover{
                background-color: var(--primary);
                color:var(--primary-inverse) !important;
            }
        }
    }
</style>
