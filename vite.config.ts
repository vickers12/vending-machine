/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import optimizeLocales from "@react-aria/optimize-locales-plugin";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    plugins: [
        svgr({ svgrOptions: { icon: true } }),
        react(),
        {
            ...optimizeLocales.vite({
                locales: ["en-US", "fr-FR"]
            }),
            enforce: "pre"
        }
    ],
    resolve: {
        alias: {
            "@assets": resolve(__dirname, "./src/assets"),
            "@components": resolve(__dirname, "./src/components"),
            "@core": resolve(__dirname, "./src/core"),
            "@hooks": resolve(__dirname, "./src/hooks"),
            "@utils": resolve(__dirname, "./src/utils"),
            "@i18n": resolve(__dirname, "./src/i18n"),
            "@stores": resolve(__dirname, "./src/stores"),
            "^.+\\.module\\.css$": "/test/__mocks__/styleMock.ts"
        }
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/test/setup-tests.ts",
        css: true
    },
    server: {
        host: true
    }
});
