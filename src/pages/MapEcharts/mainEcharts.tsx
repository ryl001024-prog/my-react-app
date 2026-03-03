import { useEffect, useMemo, useRef } from "react";
import "./mainEcharts.module.less";
import { Fullscreen, Graph, CustomPluginOption } from "@antv/g6"; // 正确导入类
import { edges, nodes } from "./mainData";
import { AfterRenderPlugin, fishEyes } from "./PluginConfig";
import { Button, Dropdown, MenuProps } from "antd";
import themeEnum from "./antV6_theme_config";
import MainTable from "./mainTable";
const dropDownMap = (): MenuProps["items"] => {
  const themes = Object.keys(themeEnum).map((item) => ({
    key: item,
    label: themeEnum[item]?.label,
  }));
  return [...themes, { key: "empty", label: "无主题" }];
};

const MainEcharts = (props: GraphType.GraphProps) => {
  const { onRender, onDestroy } = props;
  const graphRef = useRef<Graph | null>(null);

  const initialConfigTheme = useMemo<GraphThemes.ThemeOption>(
    () => ({
      background: "white",
      theme: "light",
      // 根据节点类型配置不同样式
      node: {
        style: (d: any) => {
          const colors: Record<string, { node: string; edge: string }> = {
            A: { node: "#FF6B6B", edge: "#ee9d9dff" },
            B: { node: "#4ECDC4", edge: "#b7ece9ff" },
            C: { node: "#45B7D1", edge: "#bfe2eaff" },
          };
          const nodeStyle: GraphType.NodeStyle = {
            fill: colors[d.team].node,
            stroke: colors[d.team].edge,
            lineWidth: d.size > 20 ? 3 : 2,
            size: d?.size,
            labelText: d.label,
            labelPlacement: "center",
            labelFill: "#fff",
          };
          return nodeStyle;
        },
      },

      // 根据边强度配置不同样式
      edge: {
        style: (d: any) => {
          const strength = d.data?.strength || 0.5;
          const edgeStyle: GraphType.EdgeStyle = {
            stroke:
              strength > 0.8
                ? "#FF9F1C"
                : strength > 0.6
                  ? "#7B8CDE"
                  : "#A4D3EE",
            lineWidth: strength * 3,
            opacity: strength,
            endArrow: true,
            endArrowType: "triangle",
            endArrowSize: 8,
            endArrowFill:
              strength > 0.8
                ? "#FF9F1C"
                : strength > 0.6
                  ? "#7B8CDE"
                  : "#A4D3EE",
          };
          return edgeStyle;
        },
      },
      layout: {
        type: "d3-force",
        link: {
          distance: (d: any) => {
            if (d.source.team === d.target.team) return 50;
            return 200;
          },
          strength: (d: any) => {
            if (d.source.team === d.target.team) return 0.7;
            return 0.1;
          },
        },
        manyBody: {
          strength: (d: any) => {
            if (d.label.endsWith("1")) return -100;
            return -30;
          },
        },
        collide: {
          radius: 35,
          strength: 0.8,
        },
        center: {
          strength: 0.05,
        },
      },
    }),
    [],
  );
  useEffect(() => {
    // 创建Graph实例
    const graph = new Graph({
      container: "container",
      padding: 10,
      autoResize: true,
      zoom: 1,
      ...initialConfigTheme,
      plugins: [],
      behaviors: ["drag-element-force"],
      data: { nodes, edges },
    });
    graphRef.current = graph;

    // 渲染并应用两阶段布局
    graph
      .render()
      .then(() => {
        if (
          !graphRef.current ||
          graphRef.current !== graph ||
          (graph as any).destroyed
        )
          return;
        const defaultPlugin: CustomPluginOption[] = AfterRenderPlugin();
        graph.setPlugins((plugins) => [...plugins, ...defaultPlugin]);
        // 添加布局完成事件监听
        graph.on("afterlayout", () => {
          if (!graphRef.current || graphRef.current !== graph) return;
          console.log("布局动画完成");
          onRender?.(graph);
        });
      })
      .catch((error: Error) => {
        console.warn("渲染错误:", error);
      });

    return () => {
      const graph = graphRef.current;
      if (graph) {
        if (graph && !(graph as any).destroyed) {
          try {
            graph.off("afterlayout");
            graph.destroy();
          } catch (e) {
            console.warn("销毁图形时出错:", e);
          }
        }
        onDestroy?.();
        graphRef.current = null;
      }
    };
  }, [onDestroy, onRender, initialConfigTheme]);

  const handleFullscreen = () => {
    const graph = graphRef.current;
    if (!graph || graph !== graphRef.current || (graph as any).destroyed)
      return;
    (graph.getPluginInstance("fullscreen-plugin") as Fullscreen).request();
  };

  // 放大镜启用/禁用
  const handleFishEyes = () => {
    const graph = graphRef.current;
    const plugins = graph?.getPlugins() || [];
    // 检查是否已经有鱼眼插件 (需要类型守卫,因为 plugins 可能包含 string/object/function)
    const fishEyesPlugin = plugins.find(
      (plugin) =>
        typeof plugin === "object" &&
        plugin !== null &&
        "type" in plugin &&
        plugin.type === "fisheye",
    );
    if (fishEyesPlugin) {
      graph?.setPlugins((plugins) =>
        plugins.filter(
          (plugin) =>
            !(
              typeof plugin === "object" &&
              plugin !== null &&
              "type" in plugin &&
              plugin.type === "fisheye"
            ),
        ),
      );
    } else {
      graph?.setPlugins((plugins) => [...plugins, fishEyes]);
    }
  };

  const handleTheme = async ({ key }: { key: string }) => {
    const graph = graphRef.current;
    if (!graph || graph.destroyed) return;

    // ✅ 完全重建图表
    graph.destroy();
    graphRef.current = null;

    let newConfig = {};
    if (key !== "empty") {
      newConfig = { ...themeEnum[key] };
    } else {
      newConfig = { ...initialConfigTheme };
    }
    const newGraph = new Graph({
      container: "container",
      padding: 10,
      autoResize: true,
      zoom: 1,
      layout: initialConfigTheme.layout,
      behaviors: ["drag-element-force"],
      data: { nodes, edges },
      ...newConfig,
      plugins: [],
    });
    graphRef.current = newGraph;
    await newGraph.render();
    // ✅ 重新添加插件和事件
    const defaultPlugin: CustomPluginOption[] = AfterRenderPlugin();
    newGraph.setPlugins([...defaultPlugin]);
    newGraph.on("afterlayout", () => {
      if (!graphRef.current) return;
      onRender?.(newGraph);
    });
    onRender?.(newGraph);
  };
  return (
    <div className="w-full h-screen grid grid-cols-8">
      <div className="col-span-4 bg-green-50">
        <MainTable />
      </div>
      <div id="container" className="col-span-4 bg-gray-50 pos-relative">
        <div className="pos-absolute top-10px right-10px flex gap-x-10px">
          <Dropdown
            menu={{ items: dropDownMap(), onClick: handleTheme }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Button type="primary">主题切换</Button>
          </Dropdown>
          <Button type="primary" onClick={handleFishEyes}>
            放大镜
          </Button>
          <Button type="primary" onClick={handleFullscreen}>
            全屏
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainEcharts;
