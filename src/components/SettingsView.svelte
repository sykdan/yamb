<script lang="ts">
    import { _, locale } from "svelte-i18n";

    import {
        mdiArrowLeft as Back,
        mdiTranslate as Languages,
        mdiBrightness6 as LightDarkTheme,
        mdiBrush as ColorScheme,
        mdiPlusCircleMultiple as AutoBonus,
        mdiCheck as SelectedColor,
        mdiCellphone as KeepScreenOn,
    } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import TopBar from "./ui/TopBar.svelte";
    import settings from "../lib/Settings.svelte";
    import Screen from "./ui/Screen.svelte";
    import Accordion from "./ui/Accordion.svelte";
    import ThemePreview, { type ThemeOption } from "./ui/ThemePreview.svelte";
    import { flags, supportedLanguages } from "../i18n/locale";
    import Button from "./ui/Button.svelte";
    import { isWakeLockAvailable } from "../lib/WakeLock.svelte";

    interface Props {
        onBack: () => any;
    }

    let { onBack }: Props = $props();

    const themeOptions: ThemeOption[] = ["light", "dark", "system"];
</script>

{#snippet colorSchemeSetting(identifier: string)}
    <Button
        flat
        selected={settings.color === identifier}
        onclick={() => (settings.color = identifier)}
    >
        <div
            data-color={identifier}
            class="bg-primary-500 w-14 h-14 rounded-full bg-theme-gradient bg-linear-to-l flex justify-center items-center"
        >
            {#if settings.color === identifier}
                <div class="text-neutral-50 surface:text-neutral-900">
                    <SvgIcon type="mdi" path={SelectedColor} size="40" />
                </div>
            {/if}
        </div>
    </Button>
{/snippet}

{#snippet separator(content: string)}
    <div class="flex items-center mx-2">
        <hr class="grow" />
        <span class="mx-4">{content}</span>
        <hr class="grow" />
    </div>
{/snippet}

<Screen>
    {#snippet topBar()}
        <TopBar
            title={$_("settings.title")}
            onLeftButtonPressed={() => {
                if (settings.color == "rainbow") {
                    settings.extraThemes = true;
                }
                onBack();
            }}
        >
            {#snippet leftButtonContent()}
                <SvgIcon type="mdi" path={Back} size="28" />
            {/snippet}
        </TopBar>
    {/snippet}

    {#snippet screenContent()}
        <div class="max-w-120 w-full self-center">
            <Accordion label={$_("settings.theme")} icon={LightDarkTheme}>
                <div class="py-2 px-3">
                    {$_("settings.theme_explain")}
                </div>
                <div class="grid grid-cols-3 m-2 gap-2">
                    {#each themeOptions as themeOption}
                        <Button
                            flat
                            onclick={() => (settings.theme = themeOption)}
                            selected={settings.theme == themeOption}
                        >
                            <div class="flex flex-col items-center h-full">
                                <ThemePreview theme={themeOption} />
                                <div
                                    class="text-center xl mt-2 grow flex items-center"
                                >
                                    {$_("settings.theme_" + themeOption)}
                                </div>
                            </div>
                        </Button>
                    {/each}
                </div>
            </Accordion>
            <Accordion label={$_("settings.color")} icon={ColorScheme}>
                <div class="py-2 px-3">
                    {$_("settings.color_explain")}
                </div>
                <div class="m-2 gap-2 flex flex-col max-h-150 overflow-y-auto">
                    {#if settings.extraThemes}
                        {@render separator($_("settings.color_plain"))}
                    {/if}

                    <div class="grid grid-cols-4 gap-2">
                        {@render colorSchemeSetting("blue")}
                        {@render colorSchemeSetting("red")}
                        {@render colorSchemeSetting("green")}
                        {@render colorSchemeSetting("yellow")}
                        {@render colorSchemeSetting("orange")}
                        {@render colorSchemeSetting("purple")}
                        {@render colorSchemeSetting("pink")}
                        {@render colorSchemeSetting("cyan")}
                        {#if !settings.extraThemes}
                            {@render colorSchemeSetting("rainbow")}
                        {/if}
                    </div>

                    {@render separator($_("settings.color_gradients"))}

                    <div class="grid grid-cols-4 gap-2">
                        {@render colorSchemeSetting("ruby")}
                        {@render colorSchemeSetting("diamond")}
                        {@render colorSchemeSetting("emerald")}
                        {@render colorSchemeSetting("lavender")}
                        {@render colorSchemeSetting("amber")}
                    </div>

                    {#if settings.extraThemes}
                        {@render separator($_("settings.color_pride"))}
                        <div class="grid grid-cols-4 gap-2">
                            {@render colorSchemeSetting("rainbow")}
                            {@render colorSchemeSetting("gay")}
                            {@render colorSchemeSetting("lesbian")}
                            {@render colorSchemeSetting("bi")}
                            {@render colorSchemeSetting("trans")}
                            {@render colorSchemeSetting("ace")}
                            {@render colorSchemeSetting("pan")}
                        </div>
                    {/if}
                </div>
            </Accordion>
            <Accordion label={$_("settings.autobonus")} icon={AutoBonus}>
                <div class="py-2 px-3">
                    {$_("settings.autobonus_explain")}
                </div>
                <div class="flex flex-col p-2 gap-2">
                    <Button
                        flat
                        align="start"
                        selected={settings.autoBonus === true}
                        onclick={() => (settings.autoBonus = true)}
                    >
                        {$_("common.yes")}
                    </Button>
                    <Button
                        flat
                        align="start"
                        selected={settings.autoBonus === false}
                        onclick={() => (settings.autoBonus = false)}
                    >
                        {$_("common.no")}
                    </Button>
                </div>
            </Accordion>
            <Accordion label={$_("settings.locale")} icon={Languages}>
                <div class="py-2 px-3">
                    {$_("settings.locale_explain")}
                </div>
                <div class="flex flex-col p-2 gap-2">
                    {#each Object.entries(supportedLanguages) as [key, langName], i}
                        <Button
                            flat
                            align="start"
                            onclick={() => (settings.locale = key)}
                            selected={settings.locale === key}
                        >
                            <img src={flags[key]} alt="" class="w-12 px-1" />
                            {langName}
                        </Button>
                    {/each}
                </div>
            </Accordion>
            <Accordion label={$_("settings.wakelock")} icon={KeepScreenOn}>
                <div class="py-2 px-3">
                    {$_("settings.wakelock_explain")}
                </div>
                {#if isWakeLockAvailable()}
                    <div class="flex flex-col p-2 gap-2">
                        <Button
                            flat
                            align="start"
                            selected={settings.keepScreenOn === true}
                            onclick={() => (settings.keepScreenOn = true)}
                        >
                            {$_("common.yes")}
                        </Button>
                        <Button
                            flat
                            align="start"
                            selected={settings.keepScreenOn === false}
                            onclick={() => (settings.keepScreenOn = false)}
                        >
                            {$_("common.no")}
                        </Button>
                    </div>
                {:else}
                    <div class="py-2 pt-0 px-3 italic opacity-75">
                        {$_("settings.wakelock_unsupported")}
                    </div>
                {/if}
            </Accordion>
        </div>
    {/snippet}
</Screen>
