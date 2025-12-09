// uno.config.ts
import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
} from "unocss";
import presetWebFonts from "@unocss/preset-web-fonts";

// @ts-ignore
export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      cdn: "https://esm.sh/",
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetWebFonts({
      // provider: "google",
      fonts: {
        // sans: "Inter:300,400,500,600,700",
      },
    }),
  ],
  theme: {
    colors: {
      primary: {
        50: "#eff6ff",
        100: "#dbeafe",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
      },
    },
  },
  shortcuts: {
    "glass-effect": "backdrop-blur-md bg-white:70 dark:bg-#1e293b:70",
    "card-hover": "transition-all duration-300 hover:shadow-lg hover:scale-102",
    "gradient-text":
      "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
    "no-scrollbar":
      "overflow-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    "btn-primary":
      "bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors",
    "custom-scrollbar":
      "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-slate-400 dark:[&::-webkit-scrollbar-thumb]:bg-slate-600 dark:[&::-webkit-scrollbar-thumb]:hover:bg-slate-500",
  },
  rules: [
    // 阴影规则
    ["shadow-sm", { "box-shadow": "0 1px 2px 0 rgb(0 0 0 / 0.05)" }],

    [
      "shadow-md",
      {
        "box-shadow":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
    ],
    [
      "shadow-lg",
      {
        "box-shadow":
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
    ],
    [
      "shadow-xl",
      {
        "box-shadow":
          "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      },
    ],
  ],
});
