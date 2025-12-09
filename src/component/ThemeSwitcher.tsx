import React from "react";
import { Popover, ColorPicker, Space, Button, Divider } from "antd";
import { BgColorsOutlined } from "@ant-design/icons";
import { useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/styles/theme";
import styles from "./ThemeSwitcher.module.less";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleColorChange = (color: string) => {
    setTheme({
      ...theme,
      primaryColor: color
    });
  };

  const handlePresetTheme = (themeName: string) => {
    const presetTheme = themes[themeName];
    if (presetTheme) {
      setTheme(presetTheme);
    }
  };

  const content = (
    <div className={styles.themeContent}>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>预设主题</div>
        <Space wrap>
          {Object.entries(themes).map(([name, themeConfig]) => (
            <Button
              key={name}
              size="small"
              onClick={() => handlePresetTheme(name)}
              style={{
                backgroundColor:
                  theme.primaryColor === themeConfig.primaryColor
                    ? themeConfig.primaryColor
                    : "transparent",
                borderColor: themeConfig.primaryColor,
                color:
                  theme.primaryColor === themeConfig.primaryColor
                    ? "#fff"
                    : themeConfig.primaryColor
              }}
            >
              {name === "default" ? "默认" : name}
            </Button>
          ))}
        </Space>
      </div>

      <Divider style={{ margin: "12px 0" }} />

      <div className={styles.section}>
        <div className={styles.sectionTitle}>自定义主色</div>
        <ColorPicker
          value={theme.primaryColor}
          onChange={(color) => handleColorChange(color.toHexString())}
          showText
          size="small"
        />
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      title="主题设置"
      trigger="click"
      placement="bottomRight"
    >
      <Button
        type="text"
        icon={<BgColorsOutlined />}
        className={styles.themeButton}
      >
        主题
      </Button>
    </Popover>
  );
};

export default ThemeSwitcher;

