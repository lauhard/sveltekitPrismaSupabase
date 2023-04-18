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
                    <span class="name">{data.name}</span>
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
            background-color: #63819a;
            border:1px solid #141e26;
            border-radius: 24px 10px 10px 0px;
            overflow: hidden;
            margin: 40px 0;
            box-shadow: rgba(0, 0, 0, 0.25) 5px 5px 5px -5px,
            rgba(0, 0, 0, 0.323) 15px 10px 15px -5px;
            transition: all 0.3s ease-in-out;
            width:100%;
            .header {
                background-color: #d3dbe1;
                a:hover{
                    .url, .name{    
                        color: #0e4674;
                        text-decoration: underline;
                    }
                    .name{
                        transition: all 0.1s ease-in-out;
                    }
                   
                    .fa-link{
                        transform: rotate(90deg);
                        transition: all .2 ease-in-out;
                    }
                    transition: all .3s ease-in-out;
                }
               
                a {
                    position: relative;
                    top: 1px;
                    display: flex;
                    flex-direction: row;
                    color:#071622;
                    text-decoration: none;
                    flex-wrap: wrap;
                    height: auto;
                    i {
                        transform: rotate(0deg);
                        margin: 3px 0px 0 5px;
                        flex-direction: row;
                        min-width: 2rem;
                        min-height: 2rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50%;
                        background-color: #1F2D38;
                        text-decoration: none;
                        color:#1095C1;
                        transition: all .2s ease-in-out;
                    }
                    .url {
                        margin-left: 10px;
                        display: inline-block;
                        font-size: 11px;
                    }
                    .name {
                        text-transform: capitalize;
                        font-weight: bold;
                        padding: 0;
                        margin-top: -20px;
                        width:100%;
                        display: block;
                        margin-left: 55px;
                        text-align: left;
                        transition: all 0.3s ease-in-out;
                    }
                    .menu{
                        display: flex;
                        position: absolute;
                        top:2px;
                        right:5px;
                        z-index: 10;
                        i{
                            min-width: 1.6rem;
                            min-height: 1.6rem;
                            font-size: 13px;
                        }
                        .fa-remove{
                            color: #ca3450;
                        }
                        .fa-pen{
                            color: #1095C1;
                        }
                    }
                    transition: all 0.3s ease-in-out;
                    .fa-circle-chevron-down {
                        position: absolute;
                        bottom:0px;
                        right:0px;
                        background-color: transparent;
                        color: #1F2D38;
                        // font-weight: bolder;
                        font-size: 22px;
                        transform: rotate(90deg);
                        transition: all .1s ease-in-out;
                    }
                }
                .tags {
                    ul {
                        margin: 25px 0 0px 0;
                        display: flex;
                        flex-direction: row;
                        font-size: 13px;
                        li {
                            list-style: none;
                            a {
                                padding: 0px 15px 2px 15px;
                                margin: 0 5px;
                                background-color: #1F2D38;
                                color: #d3dbe1;
                                border-radius: 50px;
                            }
                        }
                    }
                }
            }
            .body {
                p {
                    font-size: 14px;
                    padding: 0;
                    margin: 0;
                }
                padding:25px;
                background-color: #071622;
                background-color: #19476d;
                height: auto;
                min-height: 0px;
                width: 100%;
            }
            .flip{
                transform: rotate(0deg) !important;
            }
        }
       
</style>
