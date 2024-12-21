import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import _import from "eslint-plugin-import";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import typescriptEslint from "@typescript-eslint/eslint-plugin"; // eslint-disable-line import/no-unresolved
import globals from "globals";
import tsParser from "@typescript-eslint/parser"; // eslint-disable-line import/no-unresolved
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: [
            "**/tailwind.config.js",
            "**/postcss.config.js",
            "**/node_modules/",
            "**/coverage/",
            "**/build/",
            "**/dev-dist/",
        ],
    },
    ...fixupConfigRules(
        compat.extends(
            "eslint:recommended",
            "plugin:react/recommended",
            "plugin:react-hooks/recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:import/errors",
            "plugin:jsx-a11y/recommended",
            "plugin:prettier/recommended"
        )
    ),
    {
        plugins: {
            react: fixupPluginRules(react),
            import: fixupPluginRules(_import),
            "jsx-a11y": fixupPluginRules(jsxA11Y),
            prettier: fixupPluginRules(prettier),
            "@typescript-eslint": fixupPluginRules(typescriptEslint),
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.commonjs,
                ...globals.jest,
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },

                project: "./tsconfig.json",
            },
        },

        settings: {
            react: {
                version: "detect",
            },
        },

        rules: {
            indent: ["warn", 4],
            quotes: ["warn", "double"],
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
            "no-console": "off",
            "react/jsx-filename-extension": "off",
            "import/no-extraneous-dependencies": "off",
        },
    },
];
