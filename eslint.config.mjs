import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/ban-ts-comment": "error",
      "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": true }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;
