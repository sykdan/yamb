<script lang="ts">
    import type { Snippet } from "svelte";
    import Card from "./Card.svelte";

    let {
        children,
        onclick,
        vstack = null,
        flat = false,
    }: {
        children: Snippet;
        onclick: () => any;
        vstack?: "top" | "middle" | "bottom" | null;
        flat?: boolean;
    } = $props();
    
    const ROUNDING = $derived.by(() => {
        if (vstack === "top") return "rounded-t-2xl";
        if (vstack === "bottom") return "rounded-b-2xl";
        if (vstack === "middle") return false;
        return "rounded-2xl";
    });
</script>

<button {onclick} class="cursor-pointer w-full">
    <Card sharp {flat} class={["h-full overflow-hidden", ROUNDING]}>
        {@render children?.()}
    </Card>
</button>
