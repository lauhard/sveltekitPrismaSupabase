<script lang="ts">
    import FormError from "$lib/components/FormError.svelte";
    import Form from "$lib/components/Form.svelte";
    import { validate } from "$lib/zod/helper/forms.js";
    import type { ActionData, PageData, PageServerData } from "./$types";
    import { supabase } from "$lib/supabase/supabaseClient";
    import { onMount } from "svelte";
    import List from "$lib/components/List.svelte";
    import ActionButton from "$lib/components/ActionButton.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import { PrismaClient } from "@prisma/client";
    import { json } from "@sveltejs/kit";
    export let form: ActionData;
    export let data: PageServerData;
    $:bookmarks  = data?.bookmarks;
    let showActions = false;

    let dialog:HTMLDialogElement;

    let actions=[
        {
            name:"add",
            icon:"fa-solid fa-plus",
            style:"font-size:26px"
        }
    ];

    const addBookmark = async (event: CustomEvent) => {
        const { result } = event.detail;
        console.log("bookmark added: ", result);
        const { success } = result.data;
       if(success) dialog.close();
        
    };

    onMount(async () => {
      
    });

    const handleAction = (e:CustomEvent)=>{
        const {name} = e.detail;
        console.log("action name", name);
        switch(name){
            case "add":{
                dialog.show();
                showActions=false;
                break;
            }
            default: {
                break;
            }
        }
    }
</script>

<List dataSet={bookmarks} />

<Modal bind:dialog={dialog} >     
    <span slot="header"><h2>Add Bookmark</h2><p>blub</p></span>
    <Form slot="body" on:formaction={addBookmark} action="add">
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
        {#if form?.prismaError}
            <FormError error={form?.prismaError} />
        {/if}
    </Form>
</Modal>

<ActionButton {actions} on:actionclick="{handleAction}"></ActionButton>

<style lang="scss">
   h2{
        margin: 0px;
        padding: 0px;
        color:var(--primary);
    }
</style>
