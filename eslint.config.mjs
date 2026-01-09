import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default defineConfig([
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
]);
