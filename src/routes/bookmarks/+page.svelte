<script lang="ts">
	import FormError from '$lib/components/FormError.svelte';
    import Form from "$lib/components/Form.svelte";
    import { validate } from '$lib/zod/helper/forms.js';
    import type { ActionData } from './$types';
    import { invalidateAll } from '$app/navigation';
    import { applyAction } from '$app/forms';
    export let form: ActionData;

    const addBookmark = async (event:CustomEvent)=> {
        const { result } = event.detail
        console.log("signup result: ", result)
        const { success } = result.data;
    }


</script>
<h1>Bookmarks</h1>
<Form --form-max-width="900px" on:formaction={addBookmark} action="add">
    <div class="block">
        <label for="url">
            Url
            <input type="text" id="url" name="url" placeholder="Url" required on:input={validate}>
            <FormError {form} field="url" ></FormError>
        </label>
       
        <label for="name">
            Name
            <input type="text" id="name" name="name" placeholder="Name" required on:input={validate}>
            <FormError {form} field="name"></FormError>
        </label>
        <label for="name">
            Description
            <input type="text" id="description" name="description" placeholder="Description" required on:input={validate}>
            <FormError {form} field="description"></FormError>
        </label>
    </div>
    <button type="submit">Submit</button>
</Form>
<style lang="scss">
   
</style>