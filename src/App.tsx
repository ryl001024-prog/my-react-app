import { ConfigProvider } from "antd";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import RouterConfig from "./Router";

function AppContent() {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: theme.primaryColor,
          colorSuccess: theme.successColor,
          colorWarning: theme.warningColor,
          colorError: theme.errorColor,
          colorInfo: theme.infoColor,
          borderRadius: 8,
        },
        // 通过 components 配置来修改特定组件的样式
        components: {
          Input: {
            // 聚焦时的背景色 - 使用你的背景色变量
            activeBg: "var(--bg-primary)",
            // 悬停时的背景色
            hoverBg: "var(--bg-primary)",
            // 聚焦时的边框颜色 - 使用你的边框颜色变量，移除蓝色边框
            activeBorderColor: "var(--border-color)",
            // 聚焦时的阴影 - 设为 none 移除蓝色阴影
            activeShadow: "none",
            // 悬停时的边框颜色
            hoverBorderColor: "var(--border-color)",
          },
        },
      }}
    >
      <div className="w-full h-screen overflow-y-auto no-scrollbar">
        <RouterConfig />
      </div>
    </ConfigProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
