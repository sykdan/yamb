<script lang="ts">
    import InputBox from "./InputBox.svelte";
    import type { Snippet } from "svelte";

    interface Props {
        type: "singles" | "free" | "fullhouse" | "multiples" | "sequence";
        n?: 1 | 2 | 3 | 4 | 5 | 6;
        row: any;
        add?: number;
        children?: Snippet;
    }

    let {
        type,
        n = undefined,
        row = $bindable(),
        add = 0,
        children,
    }: Props = $props();
</script>

<div class="grid yamb-grid">
    <!-- Icon -->
    <div
        class="aspect-[1/2] bg-primary-500 bg-gradient-to-b bg-theme-gradient rounded-2xl shadow-md text-neutral-50 surface:text-neutral-900"
    >
        {@render children?.()}
    </div>

    <!-- Input boxes -->
    <InputBox {n} {type} bind:value={row[0]} {add} />
    <InputBox {n} {type} bind:value={row[1]} {add} />
    <InputBox {n} {type} bind:value={row[2]} {add} />
    <InputBox {n} {type} bind:value={row[3]} {add} />
</div>
