import { _, locale } from "svelte-i18n";
import { MediaQuery } from "svelte/reactivity";

function stringToBoolean(value: string) {
    if (value == "yes") return true;
    else return false;
}

function booleanToString(value: boolean) {
    return value ? "yes" : "no";
}

class YambSettings {
    theme = $state("light");
    color = $state("blue");
    locale = $state("cs");
    autoBonus = $state(true);
    extraThemes = $state(false);
    keepScreenOn = $state(false);
    showBackground = $state(true);

    gradientValues: string[] = $state([]);
    isSystemDark: MediaQuery;

    constructor() {
        this.isSystemDark = new MediaQuery('prefers-color-scheme: dark');
        this.readFromLocalStorage();
        this.registerChangeHooks();
    }

    private readFromLocalStorage() {
        this.theme = localStorage.getItem("st__theme") ?? "light";
        this.color = localStorage.getItem("st__color") ?? "blue";
        this.locale = localStorage.getItem("st__locale") ?? "cs";
        this.autoBonus = stringToBoolean((localStorage.getItem("st__autobonus") ?? "yes"));
        this.extraThemes = stringToBoolean((localStorage.getItem("st__extrathemes") ?? "no"));
        this.keepScreenOn = stringToBoolean((localStorage.getItem("st__wakelock") ?? "no"));
        this.showBackground = stringToBoolean((localStorage.getItem("st__showbackground") ?? "yes"));
    }

    private registerChangeHooks() {
        $effect.root(() => {
            $effect(() => {
                localStorage.setItem("st__theme", this.theme);
                if (this.theme === "system") {
                    document.querySelector("html")!.dataset.theme = this.isSystemDark.current ? "dark" : "light"
                } else {
                    document.querySelector("html")!.dataset.theme = this.theme;
                }
            });
            $effect(() => {
                localStorage.setItem("st__autobonus", booleanToString(this.autoBonus));
            });
            $effect(() => {
                localStorage.setItem("st__extrathemes", booleanToString(this.extraThemes));
            });
            $effect(() => {
                localStorage.setItem("st__wakelock", booleanToString(this.keepScreenOn));
            });
            $effect(() => {
                localStorage.setItem("st__showbackground", booleanToString(this.showBackground));
            });
            $effect(() => {
                localStorage.setItem("st__color", this.color);
                document.querySelector("html")!.dataset.color = this.color;
                let primaryColor = getComputedStyle(document.body).getPropertyValue('--color-primary-500') || "#000000"
                document.querySelector('meta[name="theme-color"]')!.setAttribute("content", primaryColor);
                let gradient = getComputedStyle(document.body).getPropertyValue("--bg-gradient-colors")
                if (!gradient || gradient === "none") {
                    console.log("none");
                    this.gradientValues = [
                        primaryColor,
                    ];
                } else {
                    this.gradientValues = gradient.split(",");
                }
            });
            $effect(() => {
                localStorage.setItem("st__locale", this.locale);
                locale.set(this.locale);
            });
        });
    }
}

const settings = new YambSettings();
export default settings;