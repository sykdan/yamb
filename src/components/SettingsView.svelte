<script lang="ts">
    import { _ } from "svelte-i18n";

    import {
        BackButton,
        LanguagesSetting,
        LightDarkThemeSetting,
        ColorSchemeSetting,
        AutoBonusSetting,
        KeepScreenOnSetting,
        SelectedOption,
    } from "../lib/Icons";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import TopBar from "./ui/TopBar.svelte";
    import settings from "../lib/Settings.svelte";
    import Screen from "./ui/Screen.svelte";
    import Accordion from "./ui/Accordion.svelte";
    import ThemePreview, { type ThemeOption } from "./ui/ThemePreview.svelte";
    import { flags, supportedLanguages } from "../i18n/locale";
    import Button from "./ui/Button.svelte";
    import { isWakeLockAvailable } from "../lib/WakeLock.svelte";

    let {
        onBack,
    }: {
        onBack: () => any;
    } = $props();

    const themeOptions: ThemeOption[] = ["light", "dark", "system"];
</script>

{#snippet colorSchemeSetting(identifier: string)}
    {@const selected = settings.color === identifier}
    <Button
        flat={!selected}
        {selected}
        onclick={() => (settings.color = identifier)}
    >
        <div
            data-color={identifier}
            class="bg-primary-500 w-14 h-14 rounded-full bg-theme-gradient bg-linear-to-l flex justify-center items-center"
        >
            {#if selected}
                <div class="text-neutral-50 surface:text-neutral-900">
                    <SvgIcon type="mdi" path={SelectedOption} size="40" />
                </div>
            {/if}
        </div>
    </Button>
{/snippet}

{#snippet separator(content: string | null = null)}
    <div class="flex items-center mx-2">
        <hr class="grow" />
        {#if content}
            <span class="mx-4">{content}</span>
            <hr class="grow" />
        {/if}
    </div>
{/snippet}

{#snippet binaryToggle(value: boolean, change: (newValue: boolean) => void)}
    <div class="flex flex-row p-2 gap-2">
        <Button
            flat={!value}
            align="center"
            selected={value}
            onclick={() => change(true)}
        >
            {$_("settings.yes")}
        </Button>
        <Button
            flat={value}
            align="center"
            selected={!value}
            onclick={() => change(false)}
        >
            {$_("settings.no")}
        </Button>
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
                <SvgIcon type="mdi" path={BackButton} size="28" />
            {/snippet}
        </TopBar>
    {/snippet}

    {#snippet screenContent()}
        <div class="max-w-120 w-full self-center">
            <Accordion label={$_("settings.theme")} icon={LanguagesSetting}>
                <div class="py-2 px-3">
                    {$_("settings.theme_explain")}
                </div>
                <div class="grid grid-cols-3 m-2 gap-2">
                    {#each themeOptions as themeOption}
                        {@const selected = settings.theme === themeOption}
                        <Button
                            flat={!selected}
                            class="h-full"
                            onclick={() => (settings.theme = themeOption)}
                            {selected}
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
                <div class="py-2 px-3">
                    {$_("settings.show_background_explain")}
                </div>
                {@render binaryToggle(
                    settings.showBackground,
                    (v) => (settings.showBackground = v),
                )}
            </Accordion>
            <Accordion
                label={$_("settings.color")}
                icon={LightDarkThemeSetting}
            >
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
            <Accordion
                label={$_("settings.autobonus")}
                icon={ColorSchemeSetting}
            >
                <div class="py-2 px-3">
                    {$_("settings.autobonus_explain")}
                </div>
                {@render binaryToggle(
                    settings.autoBonus,
                    (v) => (settings.autoBonus = v),
                )}
            </Accordion>
            <Accordion label={$_("settings.locale")} icon={AutoBonusSetting}>
                <div class="py-2 px-3">
                    {$_("settings.locale_explain")}
                </div>
                <div class="flex flex-col p-2 gap-2">
                    {#each Object.entries(supportedLanguages) as [key, langName], i}
                        {@const selected = settings.locale === key}
                        <Button
                            flat={!selected}
                            align="start"
                            onclick={() => (settings.locale = key)}
                            {selected}
                        >
                            <img src={flags[key]} alt="" class="w-12 px-1" />
                            {langName}
                        </Button>
                    {/each}
                </div>
            </Accordion>
            <Accordion
                label={$_("settings.wakelock")}
                icon={KeepScreenOnSetting}
            >
                <div class="py-2 px-3">
                    {$_("settings.wakelock_explain")}
                </div>
                {#if isWakeLockAvailable()}
                    {@render binaryToggle(
                        settings.keepScreenOn,
                        (v) => (settings.keepScreenOn = v),
                    )}
                {:else}
                    <div class="py-2 pt-0 px-3 italic opacity-75">
                        {$_("settings.wakelock_unsupported")}
                    </div>
                {/if}
            </Accordion>
        </div>
    {/snippet}
</Screen>
