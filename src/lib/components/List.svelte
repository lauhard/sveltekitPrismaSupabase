<script lang=ts>
    import ListItem from "./ListItem.svelte";
    export let dataSet:Array<any> = []
    console.log("dataset", dataSet)
</script>
<div class="list">
    <ul>
        {#each dataSet as data}
        <li>
            <ListItem {data}></ListItem>
        </li>
        {:else}
            <small>nothing found...</small>
        {/each}
    </ul>
</div>
<style lang="scss">
    .list{
        width: 80%;
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