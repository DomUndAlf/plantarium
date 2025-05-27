import js from "@eslint/js";
import globals from "globals";
import tsplugin from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: { react: pluginReact, "@typescript-eslint": tsplugin },
    rules: {
      // React nicht als ungenutzt melden
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^React$",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      // React 17+ JSX Runtime, kein Import zwingend nötig
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",

      // Optional: weitere Regeln
      camelcase: ["error", { properties: "always" }],
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
