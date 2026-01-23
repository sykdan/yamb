<script lang="ts">
    import { _, locale } from "svelte-i18n";

    import { mdiArrowLeft as Back } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import TopBar from "./ui/TopBar.svelte";
    import Screen from "./ui/Screen.svelte";

    import qrCode from "../assets/qrcode.png";
    import Logo from "./ui/Logo.svelte";

    interface Props {
        onBack: () => any;
    }
    let { onBack }: Props = $props();
</script>

<Screen>
    {#snippet topBar()}
        <TopBar title={$_("about.title")} onLeftButtonPressed={onBack}>
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
        <div class="max-w-120 w-full self-center text-2xl flex flex-col p-2">
            <Logo />

            <div class="mb-8 text-center">
                <div>
                    {$_("about.madeby")}
                </div>
                <div class="text-sm">
                    2023 - {new Date().getFullYear()}
                </div>
            </div>

            <div class="bg-neutral-200 dark:bg-neutral-700 rounded-2xl p-4">
                <h2 class="border-b-2 pb-1">{$_("about.thanks_title")}</h2>
                <div class="mt-2">
                    {@html $_("about.thanks_description")}
                </div>
            </div>

            <div class="mt-4">
                {$_("about.foss")}
                <a
                    class="underline text-blue-400"
                    target="_blank"
                    href="https://github.com/sykdan/yamb"
                >
                    {$_("about.repo")}
                </a>
            </div>
        </div>
    {/snippet}
</Screen>
