import sevenZipScriptUrl from '7z-wasm/7zz.umd.js?url';
import sevenZipWasmUrl from '7z-wasm/7zz.wasm?url';

export interface SevenZipWasmModule {
    FS: any;
    callMain(args: string[]): void;
}

export interface SevenZipWasmOptions {
    locateFile?: (path: string, scriptDirectory: string) => string;
    quit?: (code: number, message?: string) => void;
    [key: string]: any;
}

type SevenZipWasmFactory = (options?: SevenZipWasmOptions) => Promise<SevenZipWasmModule>;

declare global {
    interface Window {
        SevenZip?: SevenZipWasmFactory;
        __ra2SevenZipFactoryPromise?: Promise<SevenZipWasmFactory>;
    }
}

const scriptId = 'ra2-sevenzip-wasm';

async function loadFactory(): Promise<SevenZipWasmFactory> {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        throw new Error('7z-wasm can only be loaded in a browser environment');
    }
    if (window.SevenZip) {
        return window.SevenZip;
    }
    if (!window.__ra2SevenZipFactoryPromise) {
        window.__ra2SevenZipFactoryPromise = new Promise<SevenZipWasmFactory>((resolve, reject) => {
            const finish = () => {
                if (window.SevenZip) {
                    resolve(window.SevenZip);
                    return;
                }
                reject(new Error('7z-wasm script loaded without exposing a factory'));
            };
            const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
            if (existingScript) {
                if (existingScript.dataset.loaded === '1') {
                    finish();
                    return;
                }
                existingScript.addEventListener('load', finish, { once: true });
                existingScript.addEventListener('error', () => reject(new Error('Failed to load 7z-wasm script')), { once: true });
                return;
            }
            const script = document.createElement('script');
            script.id = scriptId;
            script.async = true;
            script.src = sevenZipScriptUrl;
            script.onload = () => {
                script.dataset.loaded = '1';
                finish();
            };
            script.onerror = () => reject(new Error('Failed to load 7z-wasm script'));
            document.head.appendChild(script);
        });
    }
    return window.__ra2SevenZipFactoryPromise;
}

export async function createSevenZipWasm(options: SevenZipWasmOptions = {}): Promise<SevenZipWasmModule> {
    const factory = await loadFactory();
    return factory({
        ...options,
        locateFile: options.locateFile ?? ((path: string, scriptDirectory: string) => path === '7zz.wasm' ? sevenZipWasmUrl : scriptDirectory + path),
    });
}
