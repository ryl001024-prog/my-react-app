import { ConfigProvider, App as AntdApp, theme as AntdTheme } from "antd";
import { useThemeStore } from "@/store/themeStore";
import RouterConfig from "./Router";
import { useEffect, useState } from "react";

function AppContent() {
  const { theme } = useThemeStore();
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <ConfigProvider
      theme={{
        cssVar: {},
        algorithm: isDarkMode
          ? AntdTheme.darkAlgorithm
          : AntdTheme.defaultAlgorithm,
        token: {
          colorPrimary: theme.primaryColor,
          colorSuccess: theme.successColor,
          colorWarning: theme.warningColor,
          colorError: theme.errorColor,
          colorInfo: theme.infoColor,
          borderRadius: 8,
          // 确保背景和文字色也与应用 CSS 变量一致
          colorBgContainer: isDarkMode ? "#141414" : "#ffffff",
          colorBgBase: isDarkMode ? "#000000" : "#ffffff",
          colorTextBase: isDarkMode
            ? "rgba(255, 255, 255, 0.88)"
            : "rgba(0, 0, 0, 0.88)",
        },
        components: {
          Button: {
            // 确保按钮也使用主题色
            colorPrimary: theme.primaryColor,
            colorPrimaryHover: "var(--primary-color-hover)",
            colorPrimaryActive: "var(--primary-color-active)",
          },
          Input: {
            activeBg: "var(--bg-primary)",
            hoverBg: "var(--bg-primary)",
            activeBorderColor: "var(--primary-color)",
            activeShadow: `0 0 0 2px ${theme.primaryColor}20`,
            hoverBorderColor: "var(--primary-color)",
          },
        },
      }}
    >
      <AntdApp>
        <div className="w-full h-screen overflow-y-auto no-scrollbar">
          <RouterConfig />
        </div>
      </AntdApp>
    </ConfigProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;
