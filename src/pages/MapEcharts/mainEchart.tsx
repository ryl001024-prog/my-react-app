import { useEffect, useRef } from "react";
import "./mainEchart.module.less";
import { Graph } from "@antv/g6";
const MainEchart = (props: GraphType.GraphProps) => {
  const { options, onRender, onDestroy } = props;
  const graphRef = useRef<GraphType.G6Graph>(undefined);

  useEffect(() => {
    const graph = new Graph({
      container: "container",
      padding: 10,
      background: "white",
      autoResize: true,
      // 视口配置
      zoom: 1,
      // autoFit: 'view',

      // 主题配置
      theme: "dark",

      // 节点配置
      node: {
        style: {
          fill: "#7FFFD4",
          stroke: "#5CACEE",
          lineWidth: 2,
        },
      },
      // 边配置
      edge: {
        style: {
          stroke: "#A4D3EE",
          lineWidth: 1.5,
          endArrow: true,
        },
      },
      // 布局配置
      layout: {
        type: "force",
        preventOverlap: true,
        linkDistance: 100,
      },

      // 交互行为
      behaviors: ["drag-canvas", "zoom-canvas", "drag-element"],

      // 初始数据
      data: {
        nodes: [
          { id: "node1", data: { label: "节点1" } },
          { id: "node2", data: { label: "节点2" } },
        ],
        edges: [{ source: "node1", target: "node2", data: { label: "关系" } }],
      },
    });
    graphRef.current = graph;

    graph.render(); // 立即渲染默认数据

    return () => {
      const graph = graphRef.current;
      if (graph) {
        graph.destroy();
        onDestroy?.();
        graphRef.current = undefined;
      }
    };
  }, [onDestroy]);

  useEffect(() => {

    const graph = graphRef.current;

    if (!options || !graph || graph.destroyed) return;

    graph.setOptions(options);
    graph
      .render()
      .then(() => onRender?.(graph))
      .catch((error: Error) => console.warn(error));
  }, [options, onRender]);

  return <div id="container" className='w-full h-screen bg-red'></div>;
};

export default MainEchart;
