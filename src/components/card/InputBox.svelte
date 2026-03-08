<script lang="ts">
    import { mdiClose as Cross } from "@mdi/js";
    import SvgIcon from "@jamescoyle/svelte-icon";
    import settings from "../../lib/Settings.svelte";

    interface Props {
        value: any;
        type: "singles" | "free" | "fullhouse" | "multiples" | "sequence";
        n?: number;
        add?: number;
    }

    let { value = $bindable(), type, n = 0, add = 0 }: Props = $props();

    let inputValue: number | null = $derived(getValueForInput());
    let invalid = $state(false);

    let shouldAddBonus = $derived(settings.autoBonus);

    function setInput(newValue: number | null) {
        checkValidity();

        if (newValue == null) {
            value = null;
            return;
        }

        newValue = Math.max(newValue, 0);

        if (newValue) {
            value = newValue + (shouldAddBonus ? add : 0);
        } else {
            value = 0;
        }
    }

    function checkValidity() {
        if (inputValue == null) {
            invalid = false;
            return;
        }

        let vl = inputValue;

        if (!shouldAddBonus) {
            vl -= add;
        }

        switch (type) {
            case "singles":
                invalid = vl % n != 0 || vl > n * 5;
                break;
            case "free":
                invalid = vl < 5 || vl > 30;
                break;
            case "fullhouse":
                invalid = vl < 7 || vl > 28 || vl == 10 || vl == 25;
                break;
            case "multiples":
                invalid = vl % n != 0 || vl > n * 6;
                break;
            case "sequence":
                invalid = (vl != 0 && (vl - 6) % 10 != 0) || vl < 46 || vl > 76;
                break;
        }

        if (vl == 0) {
            invalid = false;
        }

        if (vl < 0) {
            invalid = true;
        }
    }

    function getValueForInput() {
        return value !== null
            ? Math.max(value - (shouldAddBonus ? add : 0), 0)
            : null;
    }

    $effect(() => {
        checkValidity();
    });
</script>

<div class="rounded-2xl shadow-md bg-neutral-200 dark:bg-neutral-700 relative">
    <input
        class={[
            "peer text-center text-4xl rounded-2xl w-full h-full aspect-square",
            invalid && "bg-red-200 dark:bg-red-900",
        ]}
        type="number"
        pattern="[0-9]*"
        value={inputValue}
        oninput={(e) => {
            let value = (e.target as HTMLInputElement).value;
            setInput(value ? parseInt(value) : null);
        }}
    />

    {#if add > 0 && value}
        <span
            class={[
                "peer-focus:hidden pointer-events-none absolute bg-neutral-200 dark:bg-neutral-700 left-0 top-0 w-full h-full flex items-center justify-center rounded-2xl text-4xl",
                invalid && "bg-red-200 dark:bg-red-900",
            ]}
        >
            {value}
        </span>
    {:else if value == 0}
        <span
            class="peer-focus:hidden pointer-events-none absolute bg-red-400 text-red-700 left-0 top-0 w-full h-full flex items-center justify-center rounded-2xl"
        >
            <SvgIcon type="mdi" path={Cross} size={48} />
        </span>
    {/if}
</div>

<style>
    input {
        -moz-appearance: textfield;
        appearance: textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
