<script lang="ts">
    import { screenSlide } from "../../lib/Navigation.svelte";

    import type { Snippet } from "svelte";

    let {
        topBar,
        screenContent,
    }: {
        topBar?: Snippet;
        screenContent: Snippet;
    } = $props();
</script>

<div
    class="w-dvw h-dvh fixed top-0 left-0 flex flex-col overflow-hidden"
    transition:screenSlide
>
    {@render topBar?.()}
    <div class="flex flex-col grow p-2 overflow-auto">
        {@render screenContent?.()}
    </div>
</div>
