<script lang="ts">
    import { type TransitionConfig } from "svelte/transition";
    import InputBox from "./InputBox.svelte";
    import type { Snippet } from "svelte";
    import { offclick } from "../../lib/Utils";
    import AltButton from "../ui/AltButton.svelte";
    import { cubicOut } from "svelte/easing";

    let {
        label,
        type,
        n = undefined,
        row = $bindable(),
        add = 0,
        children,
    }: {
        label: string,
        type: "singles" | "free" | "fullhouse" | "multiples" | "sequence";
        n?: 1 | 2 | 3 | 4 | 5 | 6;
        row: any;
        add?: number;
        children?: Snippet;
    } = $props();

    export function yscale(node: Element): TransitionConfig {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === "none" ? "" : style.transform;
        const sd = 1;
        const od = target_opacity * 1;
        return {
            delay: 0,
            duration: 200,
            easing: cubicOut,
            css: (_t, u) => `
			transform: ${transform} scaleY(${1 - sd * u});
			opacity: ${target_opacity - od * u}`,
        };
    }

    let showHint = $state(false);
</script>

<div class="grid yamb-grid relative">
    <AltButton
        gradientDirection="down"
        class="p-0!"
        onclick={() => {
            showHint = !showHint;
        }}
    >
        {@render children?.()}
    </AltButton>

    <InputBox {n} {type} bind:value={row[0]} {add} />
    <InputBox {n} {type} bind:value={row[1]} {add} />
    <InputBox {n} {type} bind:value={row[2]} {add} />
    <InputBox {n} {type} bind:value={row[3]} {add} />

    {#if showHint}
        <div
            {@attach offclick(() => (showHint = false))}
            transition:yscale
            style="grid-column: 2/6;"
            class="h-full w-full absolute rounded-2xl bg-black/70 backdrop-blur-sm shadow-lg text-neutral-50 text-3xl flex items-center justify-center"
        >
            <div>{label}</div>
        </div>
    {/if}
</div>
