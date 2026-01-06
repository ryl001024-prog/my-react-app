import * as echarts from "echarts";
import { useEffect, useMemo } from "react";
import { useThemeStore } from "@/store/themeStore";

const RouterLoading: React.FC = () => {
  const { theme } = useThemeStore();

  // 监听 theme 变化来生成 echarts 的主题配色
  useEffect(() => {
    // 这里简单注册一个名称为 'custom-theme' 的主题，使用当前的 store 主题色
    // 实际项目中可以根据 themeConfig 生成更详细的 Echarts 配置
    const echartsTheme = {
      color: [
        theme.primaryColor,
        theme.successColor,
        theme.warningColor,
        theme.errorColor,
        theme.infoColor,
      ],
      // 可以添加更多默认配置...
    };
    echarts.registerTheme("custom-theme", echartsTheme);
  }, [theme]);

  const loadingOption = useMemo(
    () => ({
      graphic: {
        elements: [
          {
            type: "group",
            left: "center",
            top: "center",
            children: new Array(7).fill(0).map((_val, i) => ({
              type: "rect",
              x: i * 20,
              shape: {
                x: 0,
                y: -40,
                width: 10,
                height: 80,
              },
              style: {
                fill: theme.primaryColor, // 使用 store 中的主题色
              },
              keyframeAnimation: {
                duration: 1000,
                delay: i * 200,
                loop: true,
                keyframes: [
                  {
                    percent: 0.5,
                    scaleY: 0.3,
                    easing: "cubicIn",
                  },
                  {
                    percent: 1,
                    scaleY: 1,
                    easing: "cubicOut",
                  },
                ],
              },
            })),
          },
        ],
      },
    }),
    [theme.primaryColor],
  );

  useEffect(() => {
    const chartDom = document.getElementById("mainLoading");
    if (!chartDom) return;

    let loadingInstance = echarts.getInstanceByDom(chartDom);
    if (!loadingInstance) {
      loadingInstance = echarts.init(chartDom);
    }

    loadingInstance.setOption(loadingOption);

    const resizeHandler = () => {
      loadingInstance?.resize();
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      // 组件卸载时销毁实例
      loadingInstance?.dispose();
    };
  }, [loadingOption]);

  return <div id="mainLoading" className="w-full h-full"></div>;
};

export default RouterLoading;
