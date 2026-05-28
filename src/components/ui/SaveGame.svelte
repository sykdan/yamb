<script lang="ts">
    import { _, locale } from "svelte-i18n";
    import { slide } from "svelte/transition";

    import { mdiPlay as Play, mdiDelete as Delete } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import { dialogTrigger } from "../../lib/DialogTrigger.svelte";
    import type { GameData } from "../../lib/SaveData.svelte";

    let {
        metadata,
        onSaveSelected,
        onSaveDelete,
    }: {
        metadata: GameData;
        onSaveSelected: () => any;
        onSaveDelete: () => any;
    } = $props();
</script>

<div
    class="flex rounded-top-2xl py-2 px-4 w-full items-center border-b-2 border-neutral-300 dark:border-neutral-500"
    transition:slide|local
>
    <div class="flex flex-col grow">
        <span class="font-bold text-xl mb-1">
            {metadata.name}
        </span>
        <span class="text-sm italic">
            {metadata.last_played !== null
                ? new Date(metadata.last_played).toLocaleString()
                : $_("main.no_played")}
        </span>
    </div>
    <button
        class="hover:not-active:scale-105 squishy bg-amber-300 rounded-full text-neutral-900 p-2 cursor-pointer shadow-md flex flex-row me-2 items-center pe-4 text-xl"
        onclick={onSaveSelected}
    >
        <SvgIcon type="mdi" path={Play} size="32" />
        {$_("main.play")}
    </button>
    <button
        onclick={async () =>
            (await dialogTrigger.prompt(
                $_("main.delete"),
                $_("main.delete_confirm") + "\n" + $_("common.noundo"),
                $_("common.yes"),
                $_("common.no"),
            )) && onSaveDelete()}
        class="hover:not-active:scale-105 squishy bg-red-400 rounded-full text-neutral-900 p-2 cursor-pointer shadow-md aspect-square"
    >
        <SvgIcon type="mdi" path={Delete} size={32} />
    </button>
</div>
