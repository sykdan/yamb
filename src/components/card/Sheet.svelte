<script lang="ts">
    import { _ } from "svelte-i18n";
    import { scale } from "svelte/transition";
    import {
        // Header icons
        mdiArrowDownBold as Down,
        mdiSwapVerticalBold as Both,
        mdiArrowUpBold as Up,
        mdiBullhorn as Announced,

        // Side icons
        // Number-only hits
        mdiDice1 as Dice1,
        mdiDice2 as Dice2,
        mdiDice3 as Dice3,
        mdiDice4 as Dice4,
        mdiDice5 as Dice5,
        mdiDice6 as Dice6,
        // High/Low hits
        mdiPlus as Maximum,
        mdiMinus as Minimum,
        // Pattern hits
        mdiNumeric as Sequence,
        mdiHome as FullHouse,
        mdiStarFourPoints as Poker,
        mdiStar as Yamb,
    } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import Row from "./Row.svelte";
    import { type GameCard } from "../../lib/SaveData.svelte";
    import settings from "../../lib/Settings.svelte";

    // Variables for mid-game calculations
    const _GAMES = [0, 1, 2, 3];

    let singles_sums: number[] = $derived(
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

    let minmax_sums: number[] = $derived(
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

    let special_sums: number[] = $derived(
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
            let s = singles_sums.reduce((p, c) => p + c, 0);
            s += minmax_sums.reduce((p, c) => p + c, 0);
            s += special_sums.reduce((p, c) => p + c, 0);
            final_sum = s;
        } else {
            final_sum = null;
        }
    });

    let shouldAddBonus = settings.autoBonus;

    interface Props {
        card: GameCard;
        final_sum?: number | null;
    }

    let { card = $bindable(), final_sum = $bindable(null) }: Props = $props();
</script>

<div class="flex flex-col items-center">
    <div class="grid w-full max-w-120 min-w-50 gap-1 content-start">
        <div></div>

        <div
            class="aspect-[2/1] bg-primary-500 bg-gradient-to-r bg-theme-gradient rounded-2xl text-neutral-50 surface:text-neutral-900"
        >
            <SvgIcon type="mdi" path={Down} size="100%" />
        </div>
        <div
            class="aspect-[2/1] bg-primary-500 bg-gradient-to-r bg-theme-gradient rounded-2xl text-neutral-50 surface:text-neutral-900"
        >
            <SvgIcon type="mdi" path={Both} size="100%" />
        </div>
        <div
            class="aspect-[2/1] bg-primary-500 bg-gradient-to-r bg-theme-gradient rounded-2xl text-neutral-50 surface:text-neutral-900"
        >
            <SvgIcon type="mdi" path={Up} size="100%" />
        </div>
        <div
            class="aspect-[2/1] bg-primary-500 bg-gradient-to-r bg-theme-gradient rounded-2xl text-neutral-50 surface:text-neutral-900"
        >
            <SvgIcon type="mdi" path={Announced} size="100%" />
        </div>

        <Row n={1} type="singles" bind:row={card[0]} {shouldAddBonus}>
            <SvgIcon type="mdi" path={Dice1} size="100%" />
        </Row>
        <Row n={2} type="singles" bind:row={card[1]} {shouldAddBonus}>
            <SvgIcon type="mdi" path={Dice2} size="100%" />
        </Row>
        <Row n={3} type="singles" bind:row={card[2]} {shouldAddBonus}>
            <SvgIcon type="mdi" path={Dice3} size="100%" />
        </Row>
        <Row n={4} type="singles" bind:row={card[3]} {shouldAddBonus}>
            <SvgIcon type="mdi" path={Dice4} size="100%" />
        </Row>
        <Row n={5} type="singles" bind:row={card[4]} {shouldAddBonus}>
            <SvgIcon type="mdi" path={Dice5} size="100%" />
        </Row>
        <Row n={6} type="singles" bind:row={card[5]} {shouldAddBonus}>
            <SvgIcon type="mdi" path={Dice6} size="100%" />
        </Row>

        <div></div>
        <div
            class={[
                "aspect-[2/1] rounded-2xl text-neutral-50 text-3xl flex items-center justify-center",
                singles_sums[0] > 60
                    ? "bg-green-600"
                    : "bg-primary-500 bg-gradient-to-r bg-theme-gradient surface:text-neutral-900",
            ]}
        >
            {singles_sums[0]}
        </div>
        <div
            class={[
                "aspect-[2/1] rounded-2xl text-neutral-50 text-3xl flex items-center justify-center",
                singles_sums[1] > 60
                    ? "bg-green-600"
                    : "bg-primary-500 bg-gradient-to-r bg-theme-gradient surface:text-neutral-900",
            ]}
        >
            {singles_sums[1]}
        </div>
        <div
            class={[
                "aspect-[2/1] rounded-2xl text-neutral-50 text-3xl flex items-center justify-center",
                singles_sums[2] > 60
                    ? "bg-green-600"
                    : "bg-primary-500 bg-gradient-to-r bg-theme-gradient surface:text-neutral-900",
            ]}
        >
            {singles_sums[2]}
        </div>
        <div
            class={[
                "aspect-[2/1] rounded-2xl text-neutral-50 text-3xl flex items-center justify-center",
                singles_sums[3] > 60
                    ? "bg-green-600"
                    : "bg-primary-500 bg-gradient-to-r bg-theme-gradient surface:text-neutral-900",
            ]}
        >
            {singles_sums[3]}
        </div>

        <Row type="free" bind:row={card[6]} {shouldAddBonus}>
            <SvgIcon type="mdi" path={Maximum} size="100%" />
        </Row>
        <Row type="free" bind:row={card[7]} {shouldAddBonus}>
            <SvgIcon type="mdi" path={Minimum} size="100%" />
        </Row>

        <div></div>
        <div
            class="aspect-[2/1] bg-primary-500 bg-gradient-to-r bg-theme-gradient rounded-2xl text-neutral-50 surface:text-neutral-900 text-3xl flex items-center justify-center"
        >
            {minmax_sums[0]}{card[0][0] == null && minmax_sums[0] ? "?" : ""}
        </div>
        <div
            class="aspect-[2/1] bg-primary-500 bg-gradient-to-r bg-theme-gradient rounded-2xl text-neutral-50 surface:text-neutral-900 text-3xl flex items-center justify-center"
        >
            {minmax_sums[1]}{card[0][1] == null && minmax_sums[1] ? "?" : ""}
        </div>
        <div
            class="aspect-[2/1] bg-primary-500 bg-gradient-to-r bg-theme-gradient rounded-2xl text-neutral-50 surface:text-neutral-900 text-3xl flex items-center justify-center"
        >
            {minmax_sums[2]}{card[0][2] == null && minmax_sums[2] ? "?" : ""}
        </div>
        <div
            class="aspect-[2/1] bg-primary-500 bg-gradient-to-r bg-theme-gradient rounded-2xl text-neutral-50 surface:text-neutral-900 text-3xl flex items-center justify-center"
        >
            {minmax_sums[3]}{card[0][3] == null && minmax_sums[3] ? "?" : ""}
        </div>

        <Row type="sequence" bind:row={card[8]} {shouldAddBonus}>
            <SvgIcon type="mdi" path={Sequence} size="100%" />
        </Row>
        <Row type="fullhouse" bind:row={card[9]} add={30} {shouldAddBonus}>
            <SvgIcon type="mdi" path={FullHouse} size="100%" />
        </Row>
        <Row
            n={4}
            type="multiples"
            bind:row={card[10]}
            add={40}
            {shouldAddBonus}
        >
            <SvgIcon type="mdi" path={Poker} size="100%" />
        </Row>
        <Row
            n={5}
            type="multiples"
            bind:row={card[11]}
            add={50}
            {shouldAddBonus}
        >
            <SvgIcon type="mdi" path={Yamb} size="100%" />
        </Row>

        <div></div>
        <div
            class="aspect-[2/1] bg-primary-500 bg-gradient-to-r bg-theme-gradient rounded-2xl text-neutral-50 surface:text-neutral-900 text-3xl flex items-center justify-center"
        >
            {special_sums[0]}
        </div>
        <div
            class="aspect-[2/1] bg-primary-500 bg-gradient-to-r bg-theme-gradient rounded-2xl text-neutral-50 surface:text-neutral-900 text-3xl flex items-center justify-center"
        >
            {special_sums[1]}
        </div>
        <div
            class="aspect-[2/1] bg-primary-500 bg-gradient-to-r bg-theme-gradient rounded-2xl text-neutral-50 surface:text-neutral-900 text-3xl flex items-center justify-center"
        >
            {special_sums[2]}
        </div>
        <div
            class="aspect-[2/1] bg-primary-500 bg-gradient-to-r bg-theme-gradient rounded-2xl text-neutral-50 surface:text-neutral-900 text-3xl flex items-center justify-center"
        >
            {special_sums[3]}
        </div>
    </div>
    {#if final_sum != null}
        <div
            class="sticky bottom-2 bg-green-600 text-neutral-50 px-3 py-2 text-center rounded-2xl shadow-2xl"
            transition:scale|local
        >
            <div class="text-xl">{$_("game.finalscore")}</div>
            <div class="font-bold text-3xl">{final_sum}</div>
        </div>
    {/if}
</div>

<style>
    .grid {
        grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) minmax(0, 2fr) minmax(0, 2fr) minmax(0, 2fr);
    }
</style>
