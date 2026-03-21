import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const devPort = 4000;
export default defineConfig({
    plugins: [react()],
    server: {
        host: '127.0.0.1',
        port: devPort,
        strictPort: true,
        headers: {
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Opener-Policy': 'same-origin',
        },
        fs: {
            allow: ['..']
        }
    },
    preview: {
        host: '127.0.0.1',
        port: devPort,
        strictPort: true,
    },
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    build: {
        chunkSizeWarningLimit: 1600,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('/node_modules/react') || id.includes('/node_modules/react-dom') || id.includes('/node_modules/scheduler')) {
                        return 'react-vendor';
                    }
                    if (id.includes('/node_modules/three') || id.includes('three.meshline') || id.includes('@brakebein/threeoctree') || id.includes('shader-particle-engine')) {
                        return 'three-vendor';
                    }
                    if (id.includes('/src/gui/screen/game/')) {
                        return 'game-screen';
                    }
                    if (id.includes('/src/gui/screen/mainMenu/')) {
                        return 'main-menu';
                    }
                    if (id.includes('/src/tools/')) {
                        return 'test-tools';
                    }
                    if (id.includes('/src/engine/gameRes/') || id.includes('7z-wasm') || id.includes('@ffmpeg/ffmpeg')) {
                        return 'resource-tools';
                    }
                    if (id.includes('/src/gui/screen/game/gameMenu/')) {
                        return 'game-menu';
                    }
                    if (id.includes('/src/gui/screen/game/worldInteraction/')) {
                        return 'world-interaction';
                    }
                    if (id.includes('/src/gui/screen/game/component/')) {
                        return 'game-ui';
                    }
                    if (id.includes('/src/engine/renderable/')) {
                        return 'renderable-core';
                    }
                    if (id.includes('/src/engine/gfx/')) {
                        return 'gfx-core';
                    }
                    if (id.includes('/src/engine/util/')) {
                        return 'engine-util';
                    }
                    if (id.includes('/src/game/')) {
                        return 'game-core';
                    }
                    if (id.includes('/src/engine/')) {
                        return 'engine-core';
                    }
                    return undefined;
                }
            }
        }
    },
    optimizeDeps: {
        exclude: ['7z-wasm', '@ffmpeg/ffmpeg'],
        include: []
    },
    worker: {
        format: 'es'
    },
    assetsInclude: ['**/*.wasm']
});
