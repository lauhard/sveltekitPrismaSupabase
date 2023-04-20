<script lang="ts">
    import { createEventDispatcher } from "svelte";

    let showActions = false;
    const dispatch = createEventDispatcher();

    export let actions:any=[]
</script>
<div class="wrapper">
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <div class="actions"
        
        on:mouseenter={(e) => (showActions = true)}
        on:mouseout={(e) => (showActions = false)}

        class:showActions={showActions === true}
    >
        {#each actions as action}
            <!-- svelte-ignore a11y-missing-attribute -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <a  on:click={(e)=>{dispatch("actionclick",{"name":action.name}), showActions=false}}><i class="{action.icon}" style="{action.style}" on:mouseenter={(e) => (showActions = true)}  /></a>

        {/each}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
    </div>
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <i 
        on:mouseenter={(e) => (showActions = true)}
        on:mouseout={(e) => (showActions = false)}
        class="fa-solid fa-pen"
        class:penactive="{showActions==true}"
    />
</div>

<style lang="scss">
      .wrapper {
        height: auto;
        width: 50px;
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 100;
        .actions {
            width: 100%;
            display: flex;
            flex-direction: column;
            flex-flow: column-reverse;
            justify-content: flex-start;
            align-items: center;
            min-height: 1px;
            height: 1px;
            overflow: hidden;
            border-radius: 25px 25px 0 0;
            i,a {
                text-decoration: none;
                margin: 0;
                padding:0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-width: 45px;
                min-height: 45px;
                border-radius: 50%;
            }
            i{
                color: var(--primary-inverse);
                background-color:var(--primary);
            }
            a {
                margin-bottom: 5px;
            }
            i:hover{
                transition: all .3s ease-in-out;
                background-color:var(--primary-hover);
                color:var(--primary-inverse)
            }
            transition: all 1s ease-in-out;
        }
        .showActions {
            min-height: 250px;
            height: 999px;
            transition: all 1s ease-in-out;
        }
        .fa-pen {
            // background-color: #057bca;
            background-color: var(--secondary);
            color:var(--primary-inverse);
            width: 50px;
            height: 50px;
            font-size: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            transform: rotate(0deg);    
            transition: all .3s ease-in-out;
            box-sizing: border-box;
            box-shadow: rgba(0, 0, 0, 0.452) 0px 3px 8px;
        }
        .penactive {
            box-sizing: border-box;
            width: 50px;
            height: 50px;
            transform: rotate(90deg);
            transition: all .3s ease-in-out;
        }
    }
</style>