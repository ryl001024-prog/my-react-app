import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import typescriptParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin"; // 新增：导入插件

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
          modules: true,
          jsx: true
        }
      },
      parser: typescriptParser
    },
    plugins: {
      // 新增：注册 TypeScript ESLint 插件
      "@typescript-eslint": typescriptEslint as any
    },
    rules: {
      // "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "no-var": "error", // 不能使用var声明变量
      "no-extra-semi": "error",
      "indent": ["error", 2, { SwitchCase: 1 }], // 现在这个规则可以正常工作了
      "import/extensions": "off",
      "linebreak-style": [0, "error", "windows"],
      "space-before-function-paren": 0, // 在函数左括号的前面是否有空格
      "eol-last": 0, // 不检测新文件末尾是否有空行
      semi: ["error", "always"], // 在语句后面加分号
      quotes: ["error", "double"], // 字符串使用单双引号,double,single
      "no-console": ["error", { allow: ["log", "warn"] }], // 允许使用console.log()
      "arrow-parens": 0,
      "no-new": 0, //允许使用 new 关键字
      "comma-dangle": [2, "never"], // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，always-multiline多行模式必须带逗号，单行模式不能带逗号
      "no-undef": 0,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          // 忽略以 _ 开头的变量
          "varsIgnorePattern": "^_",
          // 忽略以 _ 开头的参数
          "argsIgnorePattern": "^_",
          // 忽略接口定义中的未使用类型参数
          "args": "after-used",
          // 忽略 catch 语句中的错误参数
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      "no-unused-vars": "off" // 关闭基础的 no-unused-vars，使用 TypeScript 版本的规则
    }
  }
]);