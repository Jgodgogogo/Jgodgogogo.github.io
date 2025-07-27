import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import nextPlugin from "@next/eslint-plugin-next";
import prettierConfig from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // ==================== 基础配置 ====================
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      },
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest"
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": "warn"
    }
  },

  // ==================== TypeScript 配置 ====================
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json"
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...tsPlugin.configs["strict-type-checked"].rules,
      ...tsPlugin.configs["stylistic-type-checked"].rules,
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn"
    }
  },

  // ==================== Next.js 配置 ====================
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-html-link-for-pages": "off"
    }
  },

  // ==================== Prettier 集成 ====================
  {
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": [
        "warn",
        {
          printWidth: 100,
          semi: false,
          singleQuote: true,
          trailingComma: "none"
        }
      ]
    }
  },

  // ==================== 特殊文件配置 ====================
  {
    files: ["**/*.mdx"],
    rules: {
      "react/no-unescaped-entities": "off",
      "import/no-anonymous-default-export": "off"
    }
  }
];