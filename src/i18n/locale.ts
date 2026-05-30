import { addMessages, init } from "svelte-i18n";
import cs from "./cs.json";
import en from "./en.json";
import bs from "./bs.json";

addMessages("cs", cs);
addMessages("en", en);
addMessages("bs", bs);

let _flags: { [key: string]: string } = import.meta.glob([`./flags/*.svg`], {
    eager: true,
    import: "default",
    query: '?url',
});

init({
    fallbackLocale: "en",
    initialLocale: localStorage.getItem("st__locale") ?? "cs"
});

export const flags = Object.entries(_flags).reduce((prev: { [key: string]: string }, cur: [string, string]) => {
    prev[cur[0].substring(8, 10)] = cur[1];
    return prev;
}, {});

export const supportedLanguages = {
    en: 'English',
    cs: 'Česky',
    bs: 'Bosanski',
}
