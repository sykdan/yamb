<script lang="ts">
    import type { Snippet } from "svelte";
    import { slide } from "svelte/transition";
    import Card from "./Card.svelte";
    import BaseButton from "./BaseButton.svelte";

    let {
        children,
        onclick,
        align = "center",
        vstack = null,
        selected = false,
        class: className,
        flat = false,
    }: {
        children: Snippet;
        onclick: () => any;
        align?: "start" | "center";
        vstack?: "top" | "middle" | "bottom" | null;
        selected?: boolean;
        alt?: boolean;
        flat?: boolean;
        class?: string;
    } = $props();

    const PADDING = "py-2 px-3";

    const ROUNDING = $derived.by(() => {
        if (vstack === "top") return "rounded-t-2xl";
        if (vstack === "bottom") return "rounded-b-2xl";
        if (vstack === "middle") return false;
        return "rounded-2xl";
    });
</script>

<BaseButton {onclick} {vstack} {flat}>
    <div
        class={[
            className,
            ROUNDING,
            "overflow-hidden w-full h-full text-3xl transition-all flex items-center gap-3 active:rounded-2xl active:scale-90",
            "bg-neutral-200 dark:bg-neutral-700",
            PADDING,
            "hover:bg-amber-300 active:bg-amber-300 dark:hover:text-neutral-900 dark:active:text-neutral-900",
            align === "start" ? "justify-start" : "justify-center",
            selected &&
                "not-hover:bg-neutral-300 dark:not-hover:bg-neutral-600",
        ]}
    >
        {@render children()}
    </div>
</BaseButton>
