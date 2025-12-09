import type { Graph, GraphOptions } from "@antv/g6";
declare global {
    namespace GraphType {

        interface GraphProps {
            options: GraphOptions;
            onRender?: (graph: Graph) => void;
            onDestroy?: () => void;
        }

        interface G6Graph extends Graph { }
    }
}