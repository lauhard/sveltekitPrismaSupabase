<script lang="ts">
	import FormError from '$lib/components/FormError.svelte';
    import Form from "$lib/components/Form.svelte";
    import { validate } from '$lib/zod/helper/forms.js';
    import type { ActionData, PageServerData } from './$types';
    import { supabase } from '$lib/supabase/supabaseClient'
    import { onMount } from 'svelte';
    import { json } from '@sveltejs/kit';
    import { PrismaClient, type bookmark } from '@prisma/client';
    import List from '$lib/components/List.svelte';
    export let form: ActionData;
    export let data: PageServerData;
    const {bookmarks} = data;
    console.log("bookmarks",bookmarks)
    

    const addBookmark = async (event:CustomEvent)=> {
        const { result } = event.detail
        console.log("bookmark added: ", result)
        const { success } = result.data;
    }
    // let tableData:any = [];

    onMount(async()=>{
        // let {data, error} = await supabase
        //     .from('bookmarks')
        //     .select();
        // if (error) 
        //     console.log('Error fetching data:', error.message)
        // else tableData =  data;
        // console.log( data)
    })
 

</script>
<h1>Bookmarks</h1>
<List dataSet={bookmarks}></List>
<!-- {#if bookmarks}
  <ul>
    {#each bookmarks as bm}
      <li>
        <a href="{bm.url}">{bm.name}</a>
    </li>
    {/each}
  </ul>
{:else}
  <p>Loading data...</p>
{/if} -->
<Form on:formaction={addBookmark} action="add">
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
<a href="http://"></a>
<button><i class="fa-solid add"></i></button>
<style lang="scss">
   
</style>