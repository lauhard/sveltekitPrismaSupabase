<script lang="ts">
    import FormError from "$lib/components/FormError.svelte";
    import Form from "$lib/components/Form.svelte";
    import { validate } from "$lib/zod/helper/forms.js";
    import type { ActionData, PageServerData } from "./$types";
    import { onMount } from "svelte";
    import Modal from "$lib/components/Modal.svelte";
    import FloatingButton from "$lib/components/FloatingButton.svelte";
    import ListItem from "$lib/components/ListItem.svelte";
    export let form: ActionData;
    export let data: PageServerData;
    let dialog:HTMLDialogElement;
    let dialogTitle = "Add Bookmark"
    let action = "add";
    $:bookmarks  = data?.bookmarks;
    $:currentId = 0;
    let urlError:string |undefined="";
    let nameError:string |undefined="";
    let descriptionError:string |undefined="";

    let showActions = false;
    // let actions=[
    //     {
    //         name:"add",
    //         icon:"fa-solid fa-plus",
    //         style:"font-size:26px"
    //     }
    // ];

    const addBookmark = async (event: CustomEvent) => {
        const { result } = event.detail;
        console.log("bookmark added: ", result);
        const { success } = result.data;
       if(success) dialog.close();
    };

    const handleAction = (e:CustomEvent)=>{
        const {name} = e.detail;
        console.log("action name", name);
        switch(name){
            case "add":{
                dialog.show(); 
                dialogTitle="Add Bookmark";
                showActions=false;
                break;
            }
            default: {
                break;
            }
        }
    }

    const edit = async (event: CustomEvent) => {
        const { bookmark } = event.detail;
        if(bookmark){
            console.log("edit bookmark:", bookmark.id)
            currentId = bookmark.id;
            dialogTitle="Edit Bookmark";
            action="update";
            let elements:any = dialog.getElementsByTagName("form")[0].elements;
            elements["url"].value = bookmark.url;
            elements["name"].value = bookmark.name;
            elements["description"].value = bookmark.description;
            elements["id"].value = bookmark.id;
            dialog.show();
        }
    }

    const formActionResult = (event: CustomEvent) => {
        //update
        const { result } = event.detail;
        console.log("formActionResult: ", result);
        const { success } = result.data;
        if(success) {
            dialog.close();
        } 
    }

    onMount(async () => {
        // await invalidateAll()
    });

</script>


<div class="list">
    <ul>
        {#each bookmarks as bookmark}
        <li>
            <ListItem on:formactionResult={formActionResult} on:edit={edit} {bookmark}></ListItem>
        </li>
        
        {:else}
            <small>No bookmarks available...</small>
        {/each}
    </ul>
</div>



<Modal bind:dialog={dialog} >     
    <span slot="header"><h2>{dialogTitle}</h2></span>
    <Form slot="body" on:formaction={formActionResult} action="{action}">
        <div class="block">
            <input id="id" type="{action==='update'?'text':'hidden'}" name="id" readonly  />
            <label for="url"> Url
                <input type="text" id="url" name="url" placeholder="Url" required on:input={(e)=>{urlError=validate(e)}}/>
                <FormError error={urlError} />
                <FormError {form} field="url" />
            </label>
            <label for="name"> Name
                <input type="text" id="name" name="name" placeholder="Name" required on:input={(e)=>{nameError=validate(e)}}/>
                <FormError error={nameError} />
                <FormError {form} field="name" />
            </label>
            <label for="name"> Description
                <input type="text" id="description" name="description" placeholder="Description" required on:input={(e)=>{descriptionError=validate(e)}}/>
                <FormError error={descriptionError} />
                <FormError {form} field="description" />
            </label>
        </div>
        <button type="submit">Submit</button>
        {#if form?.prismaError}
            <FormError error={form?.prismaError} />
        {/if}
    </Form>
</Modal>

<!-- <ActionButton --right="80px" {actions} on:actionclick="{handleAction}"></ActionButton> -->
<FloatingButton on:click={()=>{dialog.show(); dialogTitle="Add Bookmark"; action="add"; }}></FloatingButton>

<style lang="scss">
    h2{
        margin: 0px;
        padding: 0px;
        color:var(--primary);
    }
    .list{
        width: 80%;
        max-width: 800px;
        margin: 0 auto;
        ul{

            text-decoration: none;
            margin: 0;
            padding: 0;
            li{
                margin: 0;
                padding: 0;
                list-style: none;
            }
        }
    }
    @media screen
        and (max-device-width: 500px) {
            .list{
                width: 100%;
            }
        }
</style>
