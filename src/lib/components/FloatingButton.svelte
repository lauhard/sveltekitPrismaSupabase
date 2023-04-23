<script lang="ts">
    let icon = "fa-solid fa-add";
</script>
<div class="wrapper">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <i 
        class="{icon} action"
        on:click
    />
</div>

<style lang="scss">
      .wrapper {
        height: auto;
        width: 50px;
        position: fixed;
        right: var(--right, 20px);
        left: var(--left, auto);
        bottom: var(--bottom, 20px);
        top: var(--top, auto);
        z-index: 100;
    
        .action {
            // background-color: #057bca;
            background-color: var(--primary);
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
        .action:hover {
            background-color: var(--primary-hover);
            box-sizing: border-box;
            width: 50px;
            height: 50px;
            transform: rotate(90deg);
            transition: all .3s ease-in-out;
        }
    }
</style>