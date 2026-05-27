<script lang="ts">
    import type { Snippet } from "svelte";
    import BaseButton from "./BaseButton.svelte";

    let {
        children,
        onclick,
        align = "center",
        class: className,
        wrapperClass,
        gradientDirection = "right",
    }: {
        children: Snippet;
        onclick: () => any;
        align?: "start" | "center";
        class?: string;
        wrapperClass?: string;
        gradientDirection?: "right" | "down";
    } = $props();

    const PADDING = "py-2 px-3";
</script>

<BaseButton {onclick}>
    <div
        class={[
            wrapperClass,
            "overflow-hidden w-full h-full transition-all flex active:rounded-2xl active:scale-90",
            gradientDirection === "right"
                ? "bg-gradient-to-r"
                : "bg-gradient-to-b",
            "group bg-primary-500 bg-theme-gradient surface:text-neutral-900 text-neutral-50 dark:hover:text-neutral-900 dark:active:text-neutral-900",
        ]}
    >
        <div
            class={[
                className,
                PADDING,
                "w-full h-full text-3xl gap-3 flex items-center transition-all",
                "scale-101 group-hover:bg-amber-300 group-hover:text-neutral-950 group-active:bg-amber-300 group-active:text-neutral-950 active:rounded-2xl",
                align === "start" ? "justify-start" : "justify-center",
            ]}
        >
            {@render children()}
        </div>
    </div>
</BaseButton>
