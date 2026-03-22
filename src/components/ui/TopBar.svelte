<script lang="ts">
    import { type Snippet } from "svelte";

    let {
        title = "",
        leftButtonContent,
        onLeftButtonPressed,
        rightButtonContent,
        onRightButtonPressed,
    }: {
        title?: string;
        leftButtonContent?: Snippet;
        onLeftButtonPressed?: () => any;
        rightButtonContent?: Snippet;
        onRightButtonPressed?: () => any;
    } = $props();
</script>

{#snippet actionButton(
    content: Snippet | undefined,
    onclick: (() => any) | undefined,
)}
    <button
        class={[
            "p-2 transition-all rounded-full cursor-pointer hover:bg-black/25 active:bg-black/25 squishy",
            !content && "invisible",
        ]}
        {onclick}
    >
        {@render content?.()}
    </button>
{/snippet}

<div
    class="sticky z-20 top-0 text-center flex justify-between items-center text-3xl bg-primary-500 bg-gradient-to-r bg-theme-gradient surface:text-neutral-900 text-neutral-50 shadow-md"
>
    {@render actionButton(leftButtonContent, onLeftButtonPressed)}
    {title}
    {@render actionButton(rightButtonContent, onRightButtonPressed)}
</div>
