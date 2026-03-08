<script lang="ts">
    import type { Snippet } from "svelte";
    import { slide } from "svelte/transition";
    import Card from "./Card.svelte";

    let {
        children,
        onclick,
        align = "center",
        vstack = null,
        selected = false,
        class: className,
        alt = false,
        flat = false
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

    const BASE = "bg-neutral-200 dark:bg-neutral-700 w-full";
    const BASE_ALT = "bg-primary-500 bg-gradient-to-r bg-theme-gradient surface:text-neutral-900 text-neutral-50 w-full";
    const ROUNDING = $derived.by(() => {
        if (vstack === "top") return "rounded-t-2xl";
        if (vstack === "bottom") return "rounded-b-2xl";
        if (vstack === "middle") return false;
        return "rounded-2xl";
    });
</script>

<button {onclick} class="cursor-pointer w-full">
    <Card {flat} class={[ROUNDING]}>
        <div
            class={[
                alt ? BASE_ALT : BASE,
                ROUNDING,
                "hover:bg-amber-300 active:bg-amber-300 dark:hover:text-neutral-900 dark:active:text-neutral-900 active:rounded-2xl h-full text-3xl py-2 px-3 transition-all flex items-center gap-3 active:scale-90",
                align === "start" ? "justify-start" : "justify-center",
                selected &&
                    "not-hover:bg-neutral-300 dark:not-hover:bg-neutral-600",
                className,
            ]}
        >
            {@render children()}
        </div>
    </Card>
</button>