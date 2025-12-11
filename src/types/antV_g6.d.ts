import type { EdgeData, Graph, GraphOptions, NodeData } from "@antv/g6";
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
            options: GraphOptions;
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
}