import globals from "globals";
import reactRefresh from "eslint-plugin-react-refresh";
import { config as baseConfig } from "@repo/eslint-config/react-internal";

/**
 * @type {import("eslint").Linter.Config} */
export default [
  ...baseConfig,
  {
    languageOptions: {
      ...baseConfig.languageOptions,
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactRefresh.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];
