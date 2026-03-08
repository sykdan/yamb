<script lang="ts">
    import MainMenu from "./components/MainMenu.svelte";
    import GameView from "./components/GameView.svelte";
    import GameRules from "./components/GameRules.svelte";
    import SettingsView from "./components/SettingsView.svelte";
    import Dialog from "./components/ui/Dialog.svelte";
    import { onMount } from "svelte";
    import {
        currentState,
        Screen,
        pushScreen,
        popScreen,
        userPushedState,
    } from "./lib/Navigation.svelte";
    import ShareView from "./components/ShareView.svelte";
    import AboutView from "./components/AboutView.svelte";

    onMount(() => {
        const handlePopState = (event: PopStateEvent) => {
            userPushedState(event);
        };

        window.addEventListener("popstate", handlePopState);

        () => {
            window.removeEventListener("popstate", handlePopState);
        };
    });

    let screen: Screen = $derived(currentState.screen);
</script>

<Dialog />

<div class="bg-primary-500 bg-theme-gradient bg-gradient-to-b fixed top-0 left-0 w-full h-full">
    <div
        class="bg-radial-[circle_at_50%_110%] from-transparent to-neutral-50 dark:to-neutral-950 fixed top-0 left-0 w-full h-full"
    ></div>
</div>

{#if screen == Screen.MainMenu}
    <MainMenu
        onPlay={(game) => {
            pushScreen({ screen: Screen.GameView, game: game });
        }}
        onOpenRules={() => {
            pushScreen({ screen: Screen.GameRules });
        }}
        onOpenSettings={() => {
            pushScreen({ screen: Screen.SettingsView });
        }}
        onOpenShare={() => {
            pushScreen({ screen: Screen.ShareView });
        }}
        onOpenAbout={() => {
            pushScreen({ screen: Screen.AboutView });
        }}
    />
{:else if screen == Screen.GameView && currentState.game}
    <GameView onBack={popScreen} id={currentState.game} />
{:else if screen == Screen.GameRules}
    <GameRules onBack={popScreen} />
{:else if screen == Screen.ShareView}
    <ShareView onBack={popScreen} />
{:else if screen == Screen.AboutView}
    <AboutView onBack={popScreen} />
{:else if screen == Screen.SettingsView}
    <SettingsView
        onBack={popScreen}
        onOpenRules={() => {
            pushScreen({ screen: Screen.GameRules });
        }}
    />
{/if}
