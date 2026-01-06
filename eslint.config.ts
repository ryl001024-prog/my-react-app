import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  { ignores: ["dist", "node_modules"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // === 用户自定义规则恢复 ===
      "no-var": "error", // 不能使用var声明变量
      "no-extra-semi": "error",
      "no-console": ["off", { allow: ["error", "warn"] }], // 允许使用console.log()
      // 格式化相关规则 (明确关闭冲突项，虽然 Prettier 插件会处理，但保留配置意图)
      indent: "off",
      semi: "off",
      quotes: "off",
      "comma-dangle": 0,
      "arrow-parens": 0,
      "eol-last": 0,
      "linebreak-style": [0, "error", "windows"],
      "space-before-function-paren": 0,

      // 其他规则
      "import/extensions": "off",
      "no-new": 0, // 允许使用 new 关键字
      "no-undef": 0,

      // TypeScript 特定规则
      "no-unused-vars": "off", // 关闭基础规则
      "@typescript-eslint/no-explicit-any": [
        "off",
        {
          ignoreRestArgs: true,
          fixToUnknown: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          args: "after-used",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["service.ts"],
    rules: "off",
  },
];
