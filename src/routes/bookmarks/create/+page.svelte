<script lang="ts">
    import FormError from "$lib/components/FormError.svelte";
    import Form from "$lib/components/Form.svelte";
    import { validate } from "$lib/zod/helper/forms.js";
    import type { ActionData, PageServerData } from "./$types";
    import { supabase } from "$lib/supabase/supabaseClient";
    import { onMount } from "svelte";
    import { json } from "@sveltejs/kit";
    import { PrismaClient, type bookmark } from "@prisma/client";
    import List from "$lib/components/List.svelte";
    export let form: ActionData;

    const addBookmark = async (event: CustomEvent) => {
        const { result } = event.detail;
        console.log("bookmark added: ", result);
        const { success } = result.data;
    };

</script>
<Form on:formaction={addBookmark} action="add">
    <div class="block">
        <label for="url">
            Url
            <input
                type="text"
                id="url"
                name="url"
                placeholder="Url"
                required
                on:input={validate}
            />
            <FormError {form} field="url" />
        </label>
        <label for="name">
            Name
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required
                on:input={validate}
            />
            <FormError {form} field="name" />
        </label>
        <label for="name">
            Description
            <input
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                required
                on:input={validate}
            />
            <FormError {form} field="description" />
        </label>
    </div>
    <button type="submit">Submit</button>
</Form>