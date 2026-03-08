<script lang="ts">
    import { _, locale } from "svelte-i18n";
    import { slide } from "svelte/transition";
    import SaveGame from "./ui/SaveGame.svelte";
    import {
        getBlankGameCard,
        getNewGameData,
        type GameData,
        upgradeSaveData,
    } from "../lib/SaveData.svelte";

    import {
        mdiPlus as NewGame,
        mdiCog as Settings,
        mdiBook as HowToPlay,
        mdiShareVariant as Share,
        mdiInformation as About,
    } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import { tick } from "svelte";
    import Screen from "./ui/Screen.svelte";
    import Logo from "./ui/Logo.svelte";
    import Button from "./ui/Button.svelte";
    import Card from "./ui/Card.svelte";

    interface Props {
        onPlay: (id: string) => any;
        onOpenRules: () => any;
        onOpenSettings: () => any;
        onOpenShare: () => any;
        onOpenAbout: () => any;
    }
    let {
        onPlay,
        onOpenRules,
        onOpenSettings,
        onOpenShare,
        onOpenAbout,
    }: Props = $props();

    let games: { [key: string]: GameData } = $state(
        JSON.parse(localStorage.getItem("games") || "{}"),
    );
    $effect(() => {
        localStorage.setItem("games", JSON.stringify(games));
    });

    let gameIds: string[] = $derived(Object.keys(games));
    let newGame: GameData | null = $state(null);

    function createGame() {
        if (!newGame) return;
        let id = null;
        while (!id || gameIds.includes(id)) {
            id = (+new Date()).toString();
        }
        games[id] = newGame;
        localStorage.setItem(id, JSON.stringify(getBlankGameCard()));
        newGame = null;
    }

    async function play(id: string) {
        games[id] = upgradeSaveData(id, games[id]);
        await tick();
        onPlay(id);
    }

    function del(id: string) {
        delete games[id];
        games = games;
        localStorage.removeItem(id);
    }
</script>

<Screen>
    {#snippet screenContent()}
        <div class="flex flex-col items-center">
            <div class="flex flex-col max-w-120 w-full gap-2">
                <Logo />

                <Card class="flex flex-col">
                    {#each gameIds as key}
                        <SaveGame
                            onSaveSelected={() => play(key)}
                            onSaveDelete={() => del(key)}
                            metadata={games[key]}
                        />
                    {/each}

                    {#if !newGame}
                        <div transition:slide|local>
                            <Button
                                flat
                                vstack={gameIds.length ? "bottom" : null}
                                onclick={() => {
                                    newGame = getNewGameData();
                                }}
                            >
                                <SvgIcon type="mdi" path={NewGame} size={32} />
                                {$_("main.newgame")}
                            </Button>
                        </div>
                    {/if}

                    {#if newGame}
                        <div class="flex flex-col p-2" transition:slide|local>
                            <span class="text-xl px-2 pt-2"
                                >{$_("main.newgame_name")}:</span
                            >
                            <input
                                class="text-lg bg-neutral-50 dark:bg-neutral-900 px-3 py-2 rounded-2xl my-2"
                                type="text"
                                placeholder={$_("main.newgame_name_hint")}
                                bind:value={newGame.name}
                            />
                            {#if newGame.name}
                                <div transition:slide|local>
                                    <Button
                                        onclick={createGame}
                                        class="bg-neutral-50 dark:bg-neutral-900"
                                    >
                                        <SvgIcon
                                            type="mdi"
                                            path={NewGame}
                                            size={32}
                                        />
                                        {$_("main.newgame_create")}
                                    </Button>
                                </div>
                            {/if}
                        </div>
                    {/if}
                </Card>


                <Button onclick={onOpenRules}>
                    <SvgIcon type="mdi" path={HowToPlay} size={32} />
                    {$_("main.rules")}
                </Button>
                <Button onclick={onOpenSettings}>
                    <SvgIcon type="mdi" path={Settings} size={32} />
                    {$_("main.options")}
                </Button>
                <hr class="mx-4 opacity-25" />
                <Button onclick={onOpenShare}>
                    <SvgIcon type="mdi" path={Share} size={32} />
                    {$_("main.share")}
                </Button>
                <Button onclick={onOpenAbout}>
                    <SvgIcon type="mdi" path={About} size={32} />
                    {$_("main.about")}
                </Button>
            </div>
        </div>
    {/snippet}
</Screen>
