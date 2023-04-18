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
    export let data: PageServerData;
    const { bookmarks } = data;
    console.log("bookmarks", bookmarks);

    let showActions = false;

    // const addBookmark = async (event: CustomEvent) => {
    //     const { result } = event.detail;
    //     console.log("bookmark added: ", result);
    //     const { success } = result.data;
    // };
    // let tableData:any = [];

    onMount(async () => {
        // let {data, error} = await supabase
        //     .from('bookmarks')
        //     .select();
        // if (error)
        //     console.log('Error fetching data:', error.message)
        // else tableData =  data;
        // console.log( data)
    });
</script>

<h1>Bookmarks</h1>
<List dataSet={bookmarks} />
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


<div class="wrapper">
    <div class="actions"
        on:mouseenter={(e) => (showActions = true)}
        class:xxx={showActions === true}
    >
        <a href="/bookmarks/create"><i class="fa-solid fa-circle-plus" /></a>
    </div>
    <i
        on:mouseenter={(e) => (showActions = true)}
        on:mouseout={(e) => (showActions = false)}
        class="fa-solid fa-pen"
    />
</div>

<style lang="scss">
    .wrapper {
        height: auto;
        width: 50px;
        position: fixed;
        right: 20px;
        bottom: 20px;

        .actions {
            width: 100%;
            height: 0px;
            opacity: 0;
            display: flex;
            justify-content: center;
            i {
                font-size: 0px;
                
            }
            transition: all 0.3s ease-in-out;
        }
        .xxx {
            min-height: 50px;
            opacity: 1;

            i {
                font-size: 50px;
                margin: -5px;

            }
            transition: all 0.3s ease-in-out;
        }

        .fa-pen {
            background-color: #057bca;
            width: 50px;
            height: 50px;
            font-size: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
        }
    }
</style>
