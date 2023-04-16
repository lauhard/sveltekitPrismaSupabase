<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
</script>

<div class="app">
    <Navigation></Navigation>
    <slot></slot>
</div>
<style lang="scss">
    .app{
        width:100%;
    }
</style>