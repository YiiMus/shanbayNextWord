import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json" assert { type: "json" };

export default defineConfig({
    plugins: [crx({ manifest })],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        rollupOptions: {
            input: manifest.content_scripts[0].js.reduce((acc, script) => {
                acc[script.replace('/', '_')] = script;
                return acc;
            }, {}),
            output: {
                entryFileNames: '[name]',
                chunkFileNames: '[name]',
                assetFileNames: '[name]'
            }
        }
    }
});
