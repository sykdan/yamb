import { expoOut } from "svelte/easing";

export enum Screen {
    MainMenu,
    GameView,
    GameRules,
    SettingsView,
    ShareView,
    AboutView,
    UpdateView,
}


let frozen = $state(false);

export interface State {
    screen: Screen;
    level?: number;
    game?: string;
}

export let currentState: State & { level: number } = $state({
    screen: Screen.MainMenu,
    level: 0
});

history.replaceState($state.snapshot(currentState), "");

function changeState(state: State) {
    Object.assign(currentState, state);
}

export function setScreen(state: State) {
    if (state.level !== undefined) {
        if (state.level > currentState.level) {
            direction = 1;
        }
        else {
            direction = -1;
        }
    }
    changeState(state);
}

let direction = 1;

export function pushScreen(state: State) {
    direction = 1;
    allowNext();
    state.level = currentState.level + 1;
    changeState(state);
    history.pushState(
        $state.snapshot(currentState),
        "",
    );
}

export function popScreen() {
    direction = -1;
    allowNext();
    history.back();
}

export function freezeScreen() {
    if (!frozen) {
        frozen = true;
    }
}

export function unfreezeScreen() {
    if (frozen) {
        frozen = false;
    }
}

export function userPushedState(event: PopStateEvent) {
    if (frozen) {
        history.pushState($state.snapshot(currentState), "");
    } else {
        setScreen(event.state);
    }
}

function detectTouchSafari() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

let shouldTransition = !detectTouchSafari()
let ticks = -1;

let didIn = false;
let didOut = false;

function allowNext() {
    ticks = 0;
}

export function screenSlide(node: Element, _options: {}, params: { direction?: "in" | "out"; } | undefined) {
    if (!shouldTransition) {
        if (ticks !== -1) {
            ticks++;
            if (ticks === 2) {
                ticks = -1;
            }
        } else {
            return {}
        }
    }

    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    let translate = (t: number, u: number): string => {
        let start: number;
        if (t === 1) {
            start = -100 * direction;
        }
        else {
            start = 100 * direction
        }

        translate = (t: number, u: number) => `translateX(${start * u}dvw)`;
        return translate(t, u);
    }

    return {
        delay: 0,
        duration: 400,
        easing: expoOut,
        css: (t: number, u: number) => `transform: ${transform} ${translate(t, u)}; opacity: ${t}`
    };
}
