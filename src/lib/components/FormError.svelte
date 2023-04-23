<script lang="ts">
    import type { ActionData } from "../../routes/$types";

    export let form: ActionData = null
    export let field: string = ""
    export let error: string = ""
</script>
{#if form?.zodError[field]?._errors.length > 0}
    <small>{form?.zodError[field]?._errors}</small>
{/if}

{#if error && error.length > 0}
    <small>{error}</small>
{/if}
 
<style lang="scss">
    small{
        padding:5px 10px;
        background: #ff324f;
        border-radius: 5px;
        color:#ebebeb;
        width:100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>