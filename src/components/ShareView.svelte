<script lang="ts">
    import { _, locale } from "svelte-i18n";

    import { BackButton } from "../lib/Icons";
    import SvgIcon from "@jamescoyle/svelte-icon";

    import TopBar from "./ui/TopBar.svelte";
    import Screen from "./ui/Screen.svelte";

    import qrCode from "../assets/qrcode.png";

    let {
        onBack,
    }: {
        onBack: () => any;
    } = $props();
</script>

<Screen>
    {#snippet topBar()}
        <TopBar title={$_("share.title")} onLeftButtonPressed={onBack}>
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
        <div class="max-w-120 w-full self-center text-2xl flex flex-col p-2">
            {$_("share.share")}
            <div
                class="text-3xl text-blue-500 underline text-center my-4 select-text"
            >
                http://yamb.silver-volt4.cz
            </div>
            {$_("share.qrcode")}
            <img
                src={qrCode}
                alt="QR code"
                class="qrcode w-60 self-center my-4 shadow-2xl"
            />
        </div>
    {/snippet}
</Screen>

<style>
    .qrcode {
        image-rendering: pixelated;
    }
</style>
