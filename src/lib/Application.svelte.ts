import { useRegisterSW } from 'virtual:pwa-register/svelte';

class Application {
    canRunOffline: boolean = $state(false);
    hasNewVersion: boolean = $state(false);
    private _swUpdater: (() => Promise<void>) | null = null;

    constructor() {
        const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
            immediate: true,
            onRegistered: this.onRegistered,
            onRegisterError: this.onRegisterError,
        });
        offlineReady.subscribe(k => this.canRunOffline = k);
        needRefresh.subscribe(k => this.hasNewVersion = k);
        this._swUpdater = updateServiceWorker;
    }

    private onRegistered(swr: ServiceWorkerRegistration | undefined) {
        console.info("[pwa] SW registered:", swr);
    }

    private onRegisterError(error: any) {
        console.info('[pwa] SW registration error:', error);
    }

    async updateApp() {
        if (this._swUpdater === null) {
            throw new Error("Service worker has not been registered yet.");
        }
        await this._swUpdater();
    }
}

const ApplicationInstance = new Application();
export { ApplicationInstance as Application };
