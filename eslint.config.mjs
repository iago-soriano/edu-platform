import eslint from "@eslint/js";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["node_modules/**", "dist/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@stylistic/ts": stylisticTs,
    },
    extends: [
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
      "plugin:prettier/recommended",
      "plugin:import/recommended"
    ],
    parser: "@typescript-eslint/parser",
    rules: {
      // Translated prettier rules to stylistic
      "@stylistic/ts/indent": ["error", 2],
      //"@stylistic/ts/quotes": ["error", "single"],
      "@stylistic/ts/semi": ["error", "always"],
      "@stylistic/ts/comma-dangle": ["error", "always-multiline"],
      "@stylistic/ts/space-before-function-paren": [
        "error",
        { anonymous: "never", named: "never", asyncArrow: "always" },
      ],
      "@stylistic/ts/space-infix-ops": ["error"],
      "@typescript-eslint/no-explicit-any": "off",

      // Unused variables are not allowed, unless they start with an underscore
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          ignoreRestSiblings: true,
          caughtErrors: "none",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "no-prototype-builtins": "off",
    },
  },
);
