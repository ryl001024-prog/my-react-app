import type {
  EdgeData,
  Graph,
  GraphOptions,
  NodeData,
  ComboStyle,
  NodeStyle,
  EdgeStyle,
} from "@antv/g6";

declare global {
  namespace GraphType {
    interface NodePosition {
      id: string;
      x: number;
      y: number;
    }

    interface NodeStyle {
      fill: string;
      stroke: string;
      lineWidth?: number;
      size: number;
      label?: boolean;
      labelText?: string;
      labelBackground?: boolean;
      labelBackgroundFill?: string;
      labelBackgroundPadding?: number[];
      [key: string]: any;
    }

    interface EdgeStyle {
      stroke: string;
      lineWidth: number;
      opacity: number;
      endArrow?: boolean;
      endArrowType?: any;
      endArrowSize?: number;
      endArrowFill?: string;
      label?: boolean;
      labelText?: string;
      labelBackground?: boolean;
      labelBackgroundFill?: string;
      labelBackgroundPadding?: number[];
      [key: string]: any;
    }

    // 修复箭头样式类型
    interface ArrowStyle {
      type: string;
      size: number;
      fill: string;
    }

    interface GraphProps {
      options?: GraphOptions;
      onRender?: (graph: Graph) => void;
      onDestroy?: () => void;
    }

    // 定义必要的TypeScript接口
    interface GraphNode extends NodeData {
      id: string;
      label: string;
      type?: string;
      size: number;
      x?: number;
      y?: number;
    }

    interface GraphEdge extends EdgeData {
      source: string;
      target: string;
      data: {
        label: string;
        strength: number;
      };
    }

    interface G6Graph extends Graph {
      destroyed?: boolean;
    }
  }

  namespace GraphThemes {
    export interface ThemeOption extends Partial<GraphOptions> {
      background?: string;
      node?: {
        style?: Record<string, any> | ((...args: any[]) => NodeStyle);
        state?: {
          selected?: NodeStyle;
          active?: NodeStyle;
          highlight?: NodeStyle;
          inactive?: NodeStyle;
          disabled?: NodeStyle;
          [key: string]: NodeStyle | undefined;
        };
        [key: string]: any;
      };
      edge?: {
        style?: Record<string, any> | ((...args: any[]) => EdgeStyle);
        state?: {
          selected?: EdgeStyle;
          active?: EdgeStyle;
          highlight?: EdgeStyle;
          inactive?: EdgeStyle;
          disabled?: EdgeStyle;
          [key: string]: EdgeStyle | undefined;
        };
        [key: string]: any;
      };
      combo?: {
        style?: Record<string, any> | ((...args: any[]) => ComboStyle);
        state?: {
          selected?: ComboStyle;
          active?: ComboStyle;
          highlight?: ComboStyle;
          inactive?: ComboStyle;
          disabled?: ComboStyle;
          // 添加索引签名 - 解决错误的核心
          [key: string]: ComboStyle | undefined;
        };
        [key: string]: any;
      };
      animation?: any;
      palette?: any;
      [key: string]: any;
    }
  }
}
