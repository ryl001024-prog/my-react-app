import { useEffect, useRef } from "react";
import "./mainEchart.module.less";
import { Fullscreen, Graph, CustomPluginOption } from "@antv/g6"; // 正确导入类
import { edges, nodes } from './mainData'
import { AfterRenderPlugin, fishEyes } from "./PluginConfig";
import { Button } from "antd";

const MainEchart = (props: GraphType.GraphProps) => {
  const { options, onRender, onDestroy } = props;
  const graphRef = useRef<Graph | null>(null);

  useEffect(() => {
    // 创建Graph实例
    const graph = new Graph({
      container: "container",
      padding: 10,
      background: "white",
      autoResize: true,
      zoom: 1,
      theme: "dark",

      // 根据节点类型配置不同样式
      node: {
        style: (d: any) => {
          const colors: Record<string, { node: string, edge: string }> = {
            A: { node: '#FF6B6B', edge: '#ee9d9dff' },
            B: { node: '#4ECDC4', edge: '#b7ece9ff' },
            C: { node: '#45B7D1', edge: '#bfe2eaff' },
          };
          const nodeStyle: GraphType.NodeStyle = {
            fill: colors[d.team].node,
            stroke: colors[d.team].edge,
            lineWidth: d.size > 20 ? 3 : 2,
            size: d?.size,
            labelText: d.label,
            labelPlacement: 'center',
            labelFill: '#fff',
          };
          return nodeStyle;
        },
      },

      // 根据边强度配置不同样式
      edge: {
        style: (d: any) => {
          const strength = d.data?.strength || 0.5;
          const edgeStyle: GraphType.EdgeStyle = {
            stroke: strength > 0.8 ? '#FF9F1C' : (strength > 0.6 ? '#7B8CDE' : '#A4D3EE'),
            lineWidth: strength * 3,
            opacity: strength,
            endArrow: true,
            endArrowType: 'triangle',
            endArrowSize: 8,
            endArrowFill: strength > 0.8 ? '#FF9F1C' : (strength > 0.6 ? '#7B8CDE' : '#A4D3EE'),
          };
          return edgeStyle;
        },
      },

      // 第一阶段：网格布局确保不重叠
      layout: {
        type: 'd3-force',
        link: {
          distance: (d: any) => {
            // 同一团队内的连接距离更短
            if (d.source.team === d.target.team) return 50;
            // 不同团队间的连接距离更长
            return 200;
          },
          strength: (d: any) => {
            // 同一团队内的连接强度更大
            if (d.source.team === d.target.team) return 0.7;
            // 不同团队间的连接强度更小
            return 0.1;
          },
        },
        manyBody: {
          strength: (d: any) => {
            // 团队领导节点（编号1）的排斥力更强
            if (d.label.endsWith('1')) return -100;
            return -30;
          },
        },
        // 配置碰撞力 - 防止节点重叠
        collide: {
          radius: 35,
          strength: 0.8,
        },
        // 配置中心力 - 保持图形在画布中心
        center: {
          strength: 0.05,
        },

      },
      plugins: [

      ],

      // 交互行为
      behaviors: ['drag-element-force'],

      // 应用复杂数据
      data: {
        nodes,
        edges,
      },
    });

    graphRef.current = graph;

    // 渲染并应用两阶段布局
    graph.render().then(() => {
      if (!graphRef.current || graphRef.current !== graph || (graph as any).destroyed) return;
      console.log('第一阶段网格布局完成');
      const defaultPlugin: CustomPluginOption[] = AfterRenderPlugin();
      graph.setPlugins((plugins) => ([...plugins, ...defaultPlugin]))
      // 添加布局完成事件监听
      graph.on('afterlayout', () => {
        if (!graphRef.current || graphRef.current !== graph) return;
        console.log('布局动画完成');
        onRender?.(graph);
      });
    }).catch((error: Error) => {
      console.warn('渲染错误:', error);
    });

    // 清理函数
    return () => {
      const graph = graphRef.current;
      if (graph) {
        // 移除事件监听器
        if (graph && !(graph as any).destroyed) {
          try {
            graph.off('afterlayout');
            graph.destroy();
          } catch (e) {
            console.warn('销毁图形时出错:', e);
          }
        }
        onDestroy?.();
        graphRef.current = null;
      }
    };
  }, [onDestroy, onRender]);

  // 处理外部配置更新
  useEffect(() => {
    const graph = graphRef.current;
    if (!options || !graph || graph !== graphRef.current || (graph as any).destroyed) return;

    try {
      graph.setOptions(options);
      graph.render().then(() => {
        if (!graphRef.current || graph !== graphRef.current || (graph as any).destroyed) return;
        onRender?.(graph);
      }).catch((error: Error) => {
        console.warn('更新配置时出错:', error);
      });
    } catch (e) {
      console.warn('设置配置时出错:', e);
    }
  }, [options, onRender]);

  const handleFullscreen = () => {
    const graph = graphRef.current;
    if (!graph || graph !== graphRef.current || (graph as any).destroyed) return;
    (graph.getPluginInstance('fullscreen-plugin') as Fullscreen).request()
  }

  // 放大镜启用/禁用
  const handleFishEyes = () => {
    const graph = graphRef.current;
    const plugins = graph?.getPlugins() || [];
    // 检查是否已经有鱼眼插件 (需要类型守卫,因为 plugins 可能包含 string/object/function)
    const fishEyesPlugin = plugins.find((plugin) =>
      typeof plugin === 'object' && plugin !== null && 'type' in plugin && plugin.type === 'fisheye'
    );
    if (fishEyesPlugin) {
      graph?.setPlugins((plugins) => plugins.filter(plugin =>
        !(typeof plugin === 'object' && plugin !== null && 'type' in plugin && plugin.type === 'fisheye')
      ))
    } else {
      graph?.setPlugins((plugins) => ([...plugins, fishEyes]))
    }
  }

  return (
    <div className="w-full h-screen grid grid-cols-8">
      <div className="col-span-4 bg-green-50"></div>
      <div id="container" className='col-span-4 bg-gray-50 pos-relative'>
        <Button type="primary" className="pos-absolute top-2 right-20" onClick={handleFishEyes}>{'放大镜'}</Button>
        <Button type="primary" className="pos-absolute top-2 right-2" onClick={handleFullscreen}>{'全屏'}</Button>
      </div>
    </div>
  );
};

export default MainEchart;