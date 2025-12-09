// 主题配置类型
export interface ThemeConfig {
  primaryColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  infoColor: string;
}

// 默认主题配置
export const defaultTheme: ThemeConfig = {
  primaryColor: "#1677ff",
  successColor: "#52c41a",
  warningColor: "#faad14",
  errorColor: "#ff4d4f",
  infoColor: "#1677ff",
};

// 预设主题
export const themes: Record<string, ThemeConfig> = {
  default: defaultTheme,
  blue: {
    primaryColor: "#1677ff",
    successColor: "#52c41a",
    warningColor: "#faad14",
    errorColor: "#ff4d4f",
    infoColor: "#1677ff",
  },
  green: {
    primaryColor: "#52c41a",
    successColor: "#52c41a",
    warningColor: "#faad14",
    errorColor: "#ff4d4f",
    infoColor: "#52c41a",
  },
  purple: {
    primaryColor: "#722ed1",
    successColor: "#52c41a",
    warningColor: "#faad14",
    errorColor: "#ff4d4f",
    infoColor: "#722ed1",
  },
  orange: {
    primaryColor: "#fa8c16",
    successColor: "#52c41a",
    warningColor: "#faad14",
    errorColor: "#ff4d4f",
    infoColor: "#fa8c16",
  },
  red: {
    primaryColor: "#ff4d4f",
    successColor: "#52c41a",
    warningColor: "#faad14",
    errorColor: "#ff4d4f",
    infoColor: "#ff4d4f",
  },
};

// 应用主题到 CSS 变量
export const applyTheme = (theme: ThemeConfig) => {
  const root = document.documentElement;
  root.style.setProperty("--primary-color", theme.primaryColor);
  root.style.setProperty(
    "--primary-color-hover",
    adjustBrightness(theme.primaryColor, 20),
  );
  root.style.setProperty(
    "--primary-color-active",
    adjustBrightness(theme.primaryColor, -20),
  );
  root.style.setProperty("--success-color", theme.successColor);
  root.style.setProperty("--warning-color", theme.warningColor);
  root.style.setProperty("--error-color", theme.errorColor);
  root.style.setProperty("--info-color", theme.infoColor);
};

// 调整颜色亮度
function adjustBrightness(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  const hex = (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
  return `#${hex}`;
}

// 从 localStorage 获取主题
export const getStoredTheme = (): ThemeConfig => {
  const stored = localStorage.getItem("app-theme");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return { ...defaultTheme, ...parsed };
    } catch {
      return defaultTheme;
    }
  }
  return defaultTheme;
};

// 保存主题到 localStorage
export const saveTheme = (theme: ThemeConfig) => {
  localStorage.setItem("app-theme", JSON.stringify(theme));
};
