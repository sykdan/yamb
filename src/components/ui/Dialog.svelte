<script lang="ts">
    import { fade, scale } from "svelte/transition";
    import { dialogTrigger } from "../../lib/DialogTrigger.svelte";
    import { quadOut } from "svelte/easing";
    import { freezeScreen, unfreezeScreen } from "../../lib/Navigation.svelte";
    import { untrack } from "svelte";
    import Button from "./Button.svelte";
    import AltButton from "./AltButton.svelte";

    function resolve(result: boolean) {
        dialogTrigger.visible = false;
        dialogTrigger.resolve(result);
    }

    $effect(() => {
        if (dialogTrigger.visible) {
            untrack(() => {
                freezeScreen();
            });
        } else {
            untrack(() => {
                unfreezeScreen();
            });
        }
    });
</script>

{#if dialogTrigger.visible}
    <div
        class="dialog fixed h-dvh w-dvw bg-black/50 z-20 flex flex-col items-center justify-center backdrop-blur-sm touch-none pointer-events-[all] overscroll-contain p-2"
        transition:fade={{ duration: 300 }}
    >
        <div
            class="flex flex-col max-w-120 w-full rounded-2xl bg-neutral-50 dark:bg-neutral-900 shadow-xl whitespace-pre-line"
            in:scale={{ start: 1.2, duration: 200, easing: quadOut }}
            out:scale={{ start: 1 / 1.2, duration: 200, easing: quadOut }}
        >
            <div
                class="bg-primary-500 bg-gradient-to-r bg-theme-gradient surface:text-neutral-900 text-neutral-50 text-center text-2xl py-1 rounded-t-2xl"
            >
                {dialogTrigger.title}
            </div>

            <div class="text-2xl m-4">
                {@html dialogTrigger.message}
            </div>
            <div
                class="bg-neutral-100 dark:bg-neutral-800 flex justify-end p-2 rounded-b-2xl gap-2"
            >
                {#if dialogTrigger.cancel}
                    <Button class="text-xl" onclick={() => resolve(false)}>
                        {dialogTrigger.cancel}
                    </Button>
                {/if}
                
                <AltButton class="text-xl" onclick={() => resolve(true)}>
                    {dialogTrigger.ok}
                </AltButton>
            </div>
        </div>
    </div>
{/if}
