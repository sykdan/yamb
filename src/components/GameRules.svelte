<script lang="ts">
    import { _, locale } from "svelte-i18n";

    import {
        mdiArrowLeft as Back,
        mdiArrowDownBold as Down,
        mdiSwapVerticalBold as Both,
        mdiArrowUpBold as Up,
        mdiBullhorn as Announced,
        mdiDice1 as Dice1,
        mdiDice2 as Dice2,
        mdiDice3 as Dice3,
        mdiDice4 as Dice4,
        mdiDice5 as Dice5,
        mdiDice6 as Dice6,
        mdiPlus as Maximum,
        mdiMinus as Minimum,
        mdiNumeric as Sequence,
        mdiHome as FullHouse,
        mdiStarFourPoints as Poker,
        mdiStar as Yamb,
    } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import TopBar from "./ui/TopBar.svelte";
    import Screen from "./ui/Screen.svelte";

    let {
        onBack,
    }: {
        onBack: () => any;
    } = $props();
</script>

<Screen>
    {#snippet topBar()}
        <TopBar title={$_("rules.title")} onLeftButtonPressed={onBack}>
            {#snippet leftButtonContent()}
                <SvgIcon
                    type="mdi"
                    path={Back}
                    color="var(--surface)"
                    size="28"
                />
            {/snippet}
        </TopBar>
    {/snippet}

    {#snippet screenContent()}
        <div class="rules p-2">
            <p>
                {@html $_("rules.intro_1")}
            </p>
            <p>
                {@html $_("rules.intro_2")}
            </p>
            <p>
                {@html $_("rules.intro_3")}
            </p>
            <h2>{@html $_("rules.rows")}</h2>
            <p>{@html $_("rules.rows_intro")}</p>
            <p>
                <SvgIcon type="mdi" path={Dice1} size={32} />
                {@html $_("rules.rows_1")}
            </p>
            <p>
                <SvgIcon type="mdi" path={Dice2} size={32} />
                {@html $_("rules.rows_2")}
            </p>
            <p>
                <SvgIcon type="mdi" path={Dice3} size={32} />
                {@html $_("rules.rows_3")}
            </p>
            <p>
                <SvgIcon type="mdi" path={Dice4} size={32} />
                {@html $_("rules.rows_4")}
            </p>
            <p>
                <SvgIcon type="mdi" path={Dice5} size={32} />
                {@html $_("rules.rows_5")}
            </p>
            <p>
                <SvgIcon type="mdi" path={Dice6} size={32} />
                {@html $_("rules.rows_6")}
            </p>
            <p>
                <SvgIcon type="mdi" path={Maximum} size={32} />
                {@html $_("rules.rows_max")}
            </p>
            <p>
                <SvgIcon type="mdi" path={Minimum} size={32} />
                {@html $_("rules.rows_min")}
            </p>
            <p>
                <SvgIcon type="mdi" path={Sequence} size={32} />
                {@html $_("rules.rows_str")}
            </p>
            <ul>
                <li>
                    {@html $_("rules.rows_str_66")}
                </li>
                <li>
                    {@html $_("rules.rows_str_56")}
                </li>
                <li>
                    {@html $_("rules.rows_str_46")}
                </li>
                <li>
                    {@html $_("rules.rows_str_76")}
                </li>
            </ul>
            <p>
                <SvgIcon type="mdi" path={FullHouse} size={32} />
                {@html $_("rules.rows_fh")}<span class="text-amber-300">*</span>
            </p>
            <p>
                <SvgIcon type="mdi" path={Poker} size={32} />
                {@html $_("rules.rows_poker")}<span class="text-amber-300"
                    >*</span
                >
            </p>
            <p>
                <SvgIcon type="mdi" path={Yamb} size={32} />
                {@html $_("rules.rows_yamb")}<span class="text-amber-300"
                    >*</span
                >
            </p>
            <p class="text-lg">
                <span class="text-amber-300">*</span>
                {@html $_("rules.rows_autobonus")}
            </p>
            <h2>{@html $_("rules.cols")}</h2>
            <p>
                {@html $_("rules.cols_intro")}
            </p>
            <p>
                <SvgIcon type="mdi" path={Down} size={32} />
                {@html $_("rules.cols_down")}
            </p>
            <p>
                <SvgIcon type="mdi" path={Both} size={32} />
                {@html $_("rules.cols_any")}
            </p>
            <p>
                <SvgIcon type="mdi" path={Up} size={32} />
                {@html $_("rules.cols_up")}
            </p>
            <p>
                <SvgIcon type="mdi" path={Announced} size={32} />
                {@html $_("rules.cols_announce")}
            </p>

            <h2>{@html $_("rules.tips")}</h2>
            <p>
                {@html $_("rules.tips_1")}
            </p>
            <p>
                {@html $_("rules.tips_2")}
            </p>
            <p>
                {@html $_("rules.tips_3")}
            </p>
            <h2>{@html $_("rules.scoring")}</h2>
            <p>
                {@html $_("rules.scoring_1")}
            </p>
            <ul>
                <li>
                    {@html $_("rules.scoring_2")}
                </li>
                <li>
                    {@html $_("rules.scoring_3")}
                </li>
                <li>
                    {@html $_("rules.scoring_4")}
                </li>
                <li>{@html $_("rules.scoring_5")}</li>
            </ul>
            <p>
                {@html $_("rules.scoring_6")}
            </p>
        </div>
    {/snippet}
</Screen>

<style>
    @reference "../style/main.css";

    @layer base {
        ul {
            @apply ms-8 mb-4 -mt-2;
        }

        li {
            @apply text-2xl mb-2;
        }

        li::before {
            content: " ";
            @apply inline-block w-2 h-2 bg-current rounded-full me-3 align-middle;
        }

        p {
            @apply text-2xl mb-4;
        }

        h2 {
            @apply text-4xl border-b-2 mb-4;
        }

        .rules :global(svg) {
            @apply inline align-top;
        }
    }
</style>
