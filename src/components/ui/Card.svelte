<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    let {
        children,
        flat = false,
        sharp = false,
        class: cssClass,
        ...props
    }: HTMLAttributes<HTMLDivElement> & {
        flat?: boolean;
        sharp?: boolean;
    } = $props();
</script>

<div
    class={[
        cssClass,
        !flat ? "shadow-md" : null,
        !sharp ? "rounded-2xl" : null,
        "bg-neutral-200 dark:bg-neutral-700",
    ]}
>
    {@render children?.()}
</div>
