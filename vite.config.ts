import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import optimizeLocales from "@react-aria/optimize-locales-plugin";

export default defineConfig({
    plugins: [
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
            "@components": resolve(__dirname, "./src/components"),
            "@core": resolve(__dirname, "./src/core"),
            "@hooks": resolve(__dirname, "./src/hooks"),
            "@utils": resolve(__dirname, "./src/utils"),
            "@i18n": resolve(__dirname, "./src/i18n")
        }
    }
});
