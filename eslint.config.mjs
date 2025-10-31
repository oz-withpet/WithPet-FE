// 플러그인 import
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tailwindPlugin from "eslint-plugin-tailwindcss";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ignores: ["node_modules/", ".next/", "out/", "dist/", "build/", "coverage/"],
    languageOptions: {
      parser: tsParser, // ✅ 문자열이 아니라 import한 parser 객체
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      "unused-imports": unusedImportsPlugin,
      "react-hooks": reactHooksPlugin,
      tailwindcss: tailwindPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: { project: ["./tsconfig.json"] },
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      },
      tailwindcss: {
        callees: ["cn"],
      },
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
      ],
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
            "type",
          ],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "next/**", group: "external", position: "before" },
            { pattern: "@/**", group: "internal", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
