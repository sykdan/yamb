<script lang="ts">
    import SvgIcon from "@jamescoyle/svelte-icon";
    import type { Snippet } from "svelte";
    import { slide } from "svelte/transition";
    import Button from "./Button.svelte";
    import Card from "./Card.svelte";
    import { mdiChevronDown as AccordionArrow } from "@mdi/js";

    interface Props {
        label: string;
        icon?: string;
        children: Snippet;
    }

    let expanded = $state(false);

    let { label, icon = undefined, children }: Props = $props();
</script>

<Card class="flex flex-col mb-2 text-xl">
    <Button
        class="flex text-start"
        flat
        align="start"
        onclick={() => (expanded = !expanded)}
    >
        {#if icon}
            <div class="mx-3">
                <SvgIcon type="mdi" path={icon} size="28" />
            </div>
        {/if}
        {label}

        <div class="grow-1 flex justify-end">
            <SvgIcon
                class={["transition-transform duration-[0.3s]", expanded ? "rotate-180" : null]}
                type="mdi"
                path={AccordionArrow}
                size="28"
            />
        </div>
    </Button>
    {#if expanded}
        <div transition:slide>
            {@render children()}
        </div>
    {/if}
</Card>
