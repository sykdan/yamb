<script lang="ts">
    import { _ } from "svelte-i18n";
    import {
        ColumnDown,
        ColumnAny,
        ColumnUp,
        ColumnAnnounce,
    } from "../../lib/Icons";
    import {
        Dice1,
        Dice2,
        Dice3,
        Dice4,
        Dice5,
        Dice6,
        Maximum,
        Minimum,
        Straight,
        FullHouse,
        Poker,
        Yamb,
    } from "../../lib/Icons";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import Row from "./Row.svelte";
    import { type GameCard } from "../../lib/SaveData.svelte";

    // Variables for mid-game calculations
    const _GAMES = [0, 1, 2, 3];

    let singlesPartialSum: number[] = $derived(
        _GAMES.map((index) => {
            let sum = [0, 1, 2, 3, 4, 5].reduce(
                (p, c) => p + (card[c][index] ?? 0),
                0,
            );
            if (sum >= 60) {
                sum += 30;
            }
            return sum;
        }),
    );

    let minMaxPartialSum: number[] = $derived(
        _GAMES.map((index) => {
            let ones = card[0][index];
            let maximum = card[6][index];
            let minimum = card[7][index];

            if (maximum && minimum) {
                return (maximum - minimum) * (ones ?? 1);
            }

            return 0;
        }),
    );

    let specialPartialSum: number[] = $derived(
        _GAMES.map((index) => {
            let bonus = card[8][index] ?? 0;
            bonus += card[9][index] ?? 0;
            bonus += card[10][index] ?? 0;
            bonus += card[11][index] ?? 0;
            return bonus;
        }),
    );

    $effect(() => {
        if (!card.map((k) => k.includes(null)).includes(true)) {
            let s = singlesPartialSum.reduce((p, c) => p + c, 0);
            s += minMaxPartialSum.reduce((p, c) => p + c, 0);
            s += specialPartialSum.reduce((p, c) => p + c, 0);
            finalSum = s;
        } else {
            finalSum = null;
        }
    });

    let {
        card = $bindable(),
        finalSum = $bindable(null),
    }: {
        card: GameCard;
        finalSum?: number | null;
    } = $props();
</script>

{#snippet partialSumArea<T>(values: T[], shouldHighlight?: (v: T) => boolean)}
    {#each _GAMES as i}
        <div
            class={[
                "aspect-[2/1] rounded-2xl shadow-md text-neutral-50 text-3xl flex items-center justify-center",
                shouldHighlight?.(values[i])
                    ? "bg-green-600"
                    : "bg-primary-500 bg-gradient-to-r bg-theme-gradient surface:text-neutral-900",
            ]}
        >
            {values[i]}
        </div>
    {/each}
{/snippet}

<div class="flex flex-col items-center">
    <div class="w-full max-w-120 min-w-50 gap-1 content-start">
        <div class="grid yamb-grid">
            <div></div>
            {#each [ColumnDown, ColumnAny, ColumnUp, ColumnAnnounce] as icon}
                <div
                    class="aspect-[2/1] rounded-2xl shadow-md text-neutral-50 surface:text-neutral-900 bg-primary-500 bg-gradient-to-r bg-theme-gradient"
                >
                    <SvgIcon type="mdi" path={icon} size="100%" />
                </div>
            {/each}
        </div>

        <Row label={$_("rows.ones")} n={1} type="singles" bind:row={card[0]}>
            <SvgIcon type="mdi" path={Dice1} size="100%" />
        </Row>
        <Row label={$_("rows.twos")} n={2} type="singles" bind:row={card[1]}>
            <SvgIcon type="mdi" path={Dice2} size="100%" />
        </Row>
        <Row label={$_("rows.threes")} n={3} type="singles" bind:row={card[2]}>
            <SvgIcon type="mdi" path={Dice3} size="100%" />
        </Row>
        <Row label={$_("rows.fours")} n={4} type="singles" bind:row={card[3]}>
            <SvgIcon type="mdi" path={Dice4} size="100%" />
        </Row>
        <Row label={$_("rows.fives")} n={5} type="singles" bind:row={card[4]}>
            <SvgIcon type="mdi" path={Dice5} size="100%" />
        </Row>
        <Row label={$_("rows.sixes")} n={6} type="singles" bind:row={card[5]}>
            <SvgIcon type="mdi" path={Dice6} size="100%" />
        </Row>

        <div class="grid yamb-grid">
            <div></div>
            {@render partialSumArea(singlesPartialSum, (number) => number > 60)}
        </div>

        <Row label={$_("rows.maximum")} type="free" bind:row={card[6]}>
            <SvgIcon type="mdi" path={Maximum} size="100%" />
        </Row>
        <Row label={$_("rows.minimum")} type="free" bind:row={card[7]}>
            <SvgIcon type="mdi" path={Minimum} size="100%" />
        </Row>

        <div class="grid yamb-grid">
            <div></div>
            {@render partialSumArea(
                minMaxPartialSum.map(
                    (value, index) =>
                        `${value}${card[0][index] == null && value ? "?" : ""}`,
                ),
            )}
        </div>

        <Row label={$_("rows.straight")} type="sequence" bind:row={card[8]}>
            <SvgIcon type="mdi" path={Straight} size="100%" />
        </Row>
        <Row
            label={$_("rows.fullhouse")}
            type="fullhouse"
            bind:row={card[9]}
            add={30}
        >
            <SvgIcon type="mdi" path={FullHouse} size="100%" />
        </Row>
        <Row
            label={$_("rows.poker")}
            n={4}
            type="multiples"
            bind:row={card[10]}
            add={40}
        >
            <SvgIcon type="mdi" path={Poker} size="100%" />
        </Row>
        <Row
            label={$_("rows.yamb")}
            n={5}
            type="multiples"
            bind:row={card[11]}
            add={50}
        >
            <SvgIcon type="mdi" path={Yamb} size="100%" />
        </Row>
        <div class="grid yamb-grid">
            <div></div>
            {@render partialSumArea(specialPartialSum)}
        </div>
    </div>
</div>
