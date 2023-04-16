<script lang="ts">
	import {  enhance } from '$app/forms';
    import { formAction } from '$lib/forms/enhance';
    import { createEventDispatcher } from 'svelte';
    export let action="";
    const dispatch = createEventDispatcher();
</script>
<div class="form-wrapper">
        <form method="POST" use:enhance={(e)=>formAction(e, dispatch)} action="?/{action}">
        <slot></slot>
    </form>
</div>
<style lang="scss">
    .form-wrapper {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        form{
            min-width: var(--form-min-width, auto);
            max-width: var(--form-max-width, auto);
            width: var(--form-width, 80%);
        }
    }
</style>
