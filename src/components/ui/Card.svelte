<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    let {
        children,
        flat = false,
        class: cssClass,
        ...props
    }: HTMLAttributes<HTMLDivElement> & {
        flat?: boolean;
    } = $props();
</script>

<div
    class={[
        cssClass,
        !flat ? "shadow-md" : null,
        "rounded-2xl bg-neutral-200 dark:bg-neutral-700",
    ]}
>
    {@render children?.()}
</div>
