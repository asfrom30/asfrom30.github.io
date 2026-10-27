import eslintPluginAstro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
    },
  },
  { rules: { "no-console": "error" } },
  {
    // app/, cms.asfrom30.cloud/, asfrom30.github.io.draft/ 는 각자 독립 repo라 블로그 검사에서 뺀다
    ignores: [
      "dist/**",
      ".astro/**",
      "public/pagefind/**",
      "app/**",
      "cms.asfrom30.cloud/**",
      "asfrom30.github.io.draft/**",
    ],
  },
];
