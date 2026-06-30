<script lang="ts">
    import { _ } from "svelte-i18n";
    import { version } from "../../package.json";

    import { BackButton } from "../lib/Icons";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import TopBar from "./ui/TopBar.svelte";
    import Screen from "./ui/Screen.svelte";
    import Card from "./ui/Card.svelte";
    import Button from "./ui/Button.svelte";
    import { Application } from "../lib/Application.svelte";

    type ChangelogData = {
        released: number;
        comment: string;
    };

    function compareVersionNumbers(a: string, b: string) {
        let [aMajor, aMinor, aPatch] = a.split(".", 3).map((k) => parseInt(k));
        let [bMajor, bMinor, bPatch] = b.split(".", 3).map((k) => parseInt(k));

        if (aMajor !== bMajor) {
            return bMajor - aMajor;
        }
        if (aMinor !== bMinor) {
            return bMinor - aMinor;
        }
        if (aPatch !== bPatch) {
            return bPatch - aPatch;
        }

        return 0;
    }

    async function getChangelog(): Promise<[string, ChangelogData][]> {
        let f = await fetch("/changelog/changelog.json", { cache: "no-cache" });
        let records = Object.entries(await f.json());
        records.sort((a, b) => compareVersionNumbers(a[0], b[0]));
        records = records.filter(
            (k) => compareVersionNumbers(version, k[0]) > 0,
        );
        return records as [string, ChangelogData][];
    }

    let {
        onBack,
    }: {
        onBack: () => any;
    } = $props();

    let fetchChangelog = $state(getChangelog());
</script>

<Screen>
    {#snippet topBar()}
        <TopBar title={$_("update.title")} onLeftButtonPressed={onBack}>
            {#snippet leftButtonContent()}
                <SvgIcon
                    type="mdi"
                    path={BackButton}
                    color="var(--surface)"
                    size="28"
                />
            {/snippet}
        </TopBar>
    {/snippet}

    {#snippet screenContent()}
        <div
            class="max-w-120 w-full self-center text-2xl flex flex-col p-2 gap-4"
        >
            {#await fetchChangelog}
                {$_("update.loading")}
            {:then changelog}
                {#each changelog as [version, data]}
                    <Card>
                        <div class="fmt p-4">
                            <div class="mb-2">
                                <h2 class="mb-0">
                                    {$_("update.version")}
                                    {version}
                                </h2>
                                <div class="mb-2">
                                    <i class="text-lg">
                                        {$_("update.released")}
                                        {new Date(data.released).toLocaleString(
                                            undefined,
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            },
                                        )}
                                    </i>
                                </div>
                                <div>
                                    {@html data.comment}
                                </div>
                            </div>
                        </div>
                    </Card>
                {/each}
                {#if changelog.length === 0}
                    {$_("update.no_changelog")}
                {/if}
            {:catch}
                {$_("update.loading_failed")}
            {/await}
            <Button onclick={() => Application.updateApp()}>
                {$_("update.do_update")}
            </Button>
        </div>
    {/snippet}
</Screen>
