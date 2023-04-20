<script lang="ts">
	import { onMount } from 'svelte';
    import type { Bookmark } from "$lib/types/bookmark";

    export let data: Bookmark;
    $:flip=false;
    $:ready=false;
    $:console.log("flip",flip)

    onMount(()=>{
        ready=true;
    })
    
</script>
    {#if ready}
        <div class="card">
            <div class="header">
                <a href={data.url}>
                    <i class="fa-solid fa-link" />
                    <div class="menu">
                        <a href="#"> <i class="fa-solid fa-pen" /></a>
                        <a href="#"> <i class="fa-solid fa-remove" /></a> 
                    </div>
                    <span class="url">{data.url}</span>
                    <h3 class="name">{data.name}</h3>
                </a>
                <div class="tags">
                    <ul>
                        <li><a href="#">svelte</a></li>
                        <li><a href="#">dev</a></li>
                        <li><a href="#">movies</a></li>
                    </ul>
                </div>
                {#if data.description}
                    <a on:click={(e)=>flip=!flip}><i class="fa-solid fa-circle-chevron-down" class:flip="{flip === true}" /></a> 
                {/if}
            </div>
        {#if flip}
            <div class="body">
                <p>
                    {data.description}
                </p>
            </div>
        {/if}
    </div>
    {:else}
        <article aria-busy="true"></article>
    {/if}

<style lang="scss">
        .card {
            position: relative;
            border-radius: 24px 10px 10px 0px;
            overflow: hidden;
            margin: 40px 0;
            box-shadow: rgba(0, 0, 0, 0.25) 5px 5px 5px -5px,
            rgba(0, 0, 0, 0.323) 15px 10px 15px -5px;
            transition: all 0.3s ease-in-out;
            width:100%;
            i{
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                background-color: var(--form-element-active-background-color);
                box-sizing: border-box;
            }
            .header {
                background-color: var(--primary);
                a:hover{
                    .url, .name{    
                        color:var(--primary-inverse);
                        text-decoration: underline;
                    }
                    .fa-link{
                        transform: rotate(90deg);
                        color:var(--primary);
                    }
                }
                a {
                    position: relative;
                    top: 1px;
                    display: flex;
                    flex-direction: row;
                    color:var(--primary-inverse);
                    text-decoration: none;
                    flex-wrap: wrap;
                    height: auto;
                    .fa-link{
                        min-width: 2.2rem;
                        min-height: 2.2rem;
                        margin: 5px 0px 0 6px;
                        transition: all .2s ease-in-out;
                    }
                    .url {
                        margin-left: 1.4rem;
                        display: inline-block;
                        font-size: 16px;
                        font-weight: 500;
                    }
                    .name {
                        text-transform: capitalize;
                        font-weight: bold;
                        padding: 0;
                        margin: 0;
                        margin-top: -20px;
                        width:100%;
                        display: block;
                        margin-left: 3.8rem;
                        text-align: left;
                    }
                    .menu{
                        display: flex;
                        position: absolute;
                        justify-content: space-between;
                        top:5px;
                        right:5px;
                        z-index: 10;
                        box-sizing: border-box;
                        i ,a{
                            width:33px;
                            height:33px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        a{
                            margin-left: 5px;
                        }
                        .fa-remove, .fa-pen{
                            color:var(--primary-inverse);
                            font-size: 14px;
                            min-width: 1.3rem;
                            min-height: 1.3rem;
                            box-sizing: border-box;
                        }
                        .fa-pen{
                            font-size: 10px;
                            box-sizing: border-box;
                        }
                        .fa-remove:hover, .fa-pen:hover{
                            color: var(--del-color);
                            box-sizing: border-box;
                        }
                        .fa-pen:hover{
                            color: var(--primary)
                        }
                    }
                    transition: all 0.3s ease-in-out;
                    .fa-circle-chevron-down {
                        position: absolute;
                        bottom:0px;
                        right:0px;
                        background-color: transparent;
                        color: var(--form-element-active-background-color);
                        font-size: 26px;
                        margin: 5px;
                        transform: rotate(90deg);
                        transition: all .1s ease-in-out;
                    }
                }
                .tags {
                    ul {
                        margin: 15px 0 0 0;
                        display: flex;
                        flex-direction: row;
                        font-size: 16px;
                        text-decoration: none;
                        margin:0px;
                        padding: 0px;
                        margin: 15px 0 0 0;
                        li {
                            text-decoration: none;
                            list-style: none;
                            a {
                                padding: 0px 15px 2px 15px;
                                margin: 0 5px;
                                background-color: var(--form-element-active-background-color);
                                color:var(--primary-inverse);
                                border-radius: 50px;
                            }
                        }
                    }
                }
            }
            .body {
                p {
                    padding: 0;
                    margin: 0;
                }
                padding:25px;
                background-color: var(--form-element-background-color);
                height: auto;
                min-height: 0px;
                width: 100%;
            }
            .flip{
                transform: rotate(0deg) !important;
            }
        }
</style>
