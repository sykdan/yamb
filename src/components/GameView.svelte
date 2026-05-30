<script lang="ts">
    import { _ } from "svelte-i18n";
    import { onMount } from "svelte";
    import { fade, fly, scale } from "svelte/transition";

    import {
        BackButton,
        MenuButton,
        CrossOutButton,
        WhoIsPlayingButton,
        ClearCardButton,
    } from "../lib/Icons";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import PlayingCard from "./card/Sheet.svelte";
    import {
        getBlankGameCard,
        type GameData,
        type GameCard,
        GAME_CARD_SIZE,
    } from "../lib/SaveData.svelte";
    import TopBar from "./ui/TopBar.svelte";
    import { dialogTrigger } from "../lib/DialogTrigger.svelte";
    import Screen from "./ui/Screen.svelte";
    import { offclick } from "../lib/Utils";
    import Button from "./ui/Button.svelte";
    import { releaseWakeLock, takeWakeLock } from "../lib/WakeLock.svelte";
    import Card from "./ui/Card.svelte";

    let {
        id,
        onBack,
    }: {
        id: string;
        onBack: () => any;
    } = $props();

    let finalSum = $state(null);
    let showActions = $state(false);
    let gameData: GameData = $state(
        JSON.parse(localStorage.getItem("games")!)[id],
    );
    let card: GameCard = $state(JSON.parse(localStorage.getItem(id)!));

    onMount(() => {
        gameData.last_played = +new Date();
    });

    function countFilled() {
        let sum = 0;
        for (let row of card) {
            for (let cell of row) {
                sum += cell !== null ? 1 : 0;
            }
        }
        return sum;
    }

    async function zeroes() {
        if (
            await dialogTrigger.prompt(
                $_("game.crossempty"),
                $_("game.crossempty_confirm") + "\n" + $_("common.noundo"),
                $_("common.yes"),
                $_("common.no"),
            )
        ) {
            card = card.map((k) => k.map((l) => l ?? 0));
            showActions = false;
        }
    }

    function getFirstPlacedTime() {
        if (!gameData.first_placed) return null;
        let date = new Date(gameData.first_placed);
        return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
    }

    async function order() {
        let message = $_("game.whoisplaying_intro") + "\n\n";
        if (gameData.first_placed) {
            message +=
                $_("game.whoisplaying_time", {
                    values: { time: `<b>${getFirstPlacedTime()}</b>` },
                }) + "\n";
        }
        message +=
            $_("game.whoisplaying_fields", {
                values: {
                    n: `<b>${GAME_CARD_SIZE - countFilled()}</b>`,
                },
            }) + "\n";

        await dialogTrigger.prompt(
            $_("game.whoisplaying"),
            message,
            $_("common.ok"),
        );
    }

    async function clear() {
        if (
            await dialogTrigger.prompt(
                $_("game.reset"),
                $_("game.reset_confirm") + "\n" + $_("common.noundo"),
                $_("common.yes"),
                $_("common.no"),
            )
        ) {
            card = getBlankGameCard();
            gameData.first_placed = null;
            showActions = false;
        }
    }

    $effect(() => {
        localStorage.setItem(id, JSON.stringify(card));
        let filled = countFilled();
        if (filled == 0) {
            gameData.first_placed = null;
        } else if (filled == 1) {
            gameData.first_placed = +new Date();
        }
    });

    $effect(() => {
        let games = JSON.parse(localStorage.getItem("games")!);
        games[id] = gameData;
        localStorage.setItem("games", JSON.stringify(games));
    });

    $effect(() => {
        takeWakeLock();
        return releaseWakeLock;
    });
</script>

<Screen>
    {#snippet topBar()}
        <TopBar
            title={gameData.name}
            onLeftButtonPressed={onBack}
            onRightButtonPressed={() => (showActions = !showActions)}
        >
            {#snippet leftButtonContent()}
                <SvgIcon type="mdi" path={BackButton} size="28" />
            {/snippet}
            {#snippet rightButtonContent()}
                <SvgIcon type="mdi" path={MenuButton} size="28" />
            {/snippet}
        </TopBar>
    {/snippet}

    {#snippet screenContent()}
        {#if showActions}
            <div
                class="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-xs z-30 p-3 flex flex-col justify-end items-center"
                transition:fade
            >
                <div
                    {@attach offclick(
                        (this_element: Element, clicked_element: Element) => {
                            if (
                                this_element.contains(
                                    clicked_element as Element,
                                ) ||
                                dialogTrigger.visible
                            ) {
                                return;
                            }
                            showActions = false;
                        },
                    )}
                    transition:fly={{ y: 200 }}
                    class="max-w-120 w-full justify-self-end"
                >
                    <Card class="flex flex-col">
                        <Button flat onclick={zeroes} vstack="top">
                            <SvgIcon
                                type="mdi"
                                path={CrossOutButton}
                                size={32}
                            />
                            {$_("game.crossempty")}
                        </Button>
                        <div
                            class="border-b-2 border-neutral-300 dark:border-neutral-500"
                        ></div>
                        <Button flat onclick={order} vstack="middle">
                            <SvgIcon
                                type="mdi"
                                path={WhoIsPlayingButton}
                                size={32}
                            />
                            {$_("game.whoisplaying")}
                        </Button>
                        <div
                            class="border-b-2 border-neutral-300 dark:border-neutral-500"
                        ></div>
                        <Button
                            flat
                            onclick={clear}
                            vstack="bottom"
                            class="text-red-500! hover:text-red-800!"
                        >
                            <SvgIcon
                                type="mdi"
                                path={ClearCardButton}
                                size={32}
                            />
                            {$_("game.reset")}
                        </Button>
                    </Card>
                </div>
            </div>
        {/if}

        <PlayingCard bind:card bind:finalSum />
        <div class="sticky bottom-0 flex flex-col items-center">
            {#if finalSum !== null}
                <div
                    class="mt-2 bg-green-600 text-neutral-50 px-3 py-2 text-center rounded-2xl shadow-2xl flex gap-2 items-center"
                    transition:scale|local
                >
                    <div class="text-xl">{$_("game.finalscore")}:</div>
                    <div class="font-bold text-3xl">{finalSum}</div>
                </div>
            {/if}
        </div>
    {/snippet}
</Screen>
