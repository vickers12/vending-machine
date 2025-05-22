import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
    { ignores: ["dist", "vite.config.ts"] },

    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 2020,
            sourceType: "module",
            parserOptions: {
                project: "./tsconfig.eslint.json",
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: { jsx: true }
            },
            globals: globals.browser
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
            react,
            "jsx-a11y": jsxA11y,
            prettier,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh
        },
        rules: {
            // Core ESLint (JS)
            ...js.configs.recommended.rules,

            // TypeScript
            ...tseslint.configs.recommended[0].rules,
            ...tseslint.configs.recommended[1].rules,

            // React
            ...react.configs.recommended.rules,

            // React Hooks
            ...reactHooks.configs.recommended.rules,

            // JSX a11y
            ...jsxA11y.configs.recommended.rules,

            // Prettier
            ...prettier.configs.recommended.rules,

            // Custom rules
            "@typescript-eslint/consistent-type-imports": "error",
            "prettier/prettier": "error",
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            "react/react-in-jsx-scope": "off",
            "comma-dangle": ["error", "never"],
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "react/prop-types": "off"
        },
        settings: {
            react: {
                version: "detect"
            }
        }
    }
);
