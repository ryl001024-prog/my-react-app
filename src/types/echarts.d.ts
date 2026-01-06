declare module "echarts-for-react" {
  import { Component } from "react";
  import { EChartsOption, ECharts } from "echarts";

  export interface EChartsReactProps {
    option: EChartsOption;
    style?: React.CSSProperties;
    className?: string;
    theme?: string | object;
    onChartReady?: (chartInstance: ECharts) => void;
    onEvents?: { [eventName: string]: (params: any) => void };
    notMerge?: boolean;
    lazyUpdate?: boolean;
    silent?: boolean;
    showLoading?: boolean;
    loadingOption?: object;
    onChartFinished?: (chartInstance: ECharts) => void;
    opts?: {
      devicePixelRatio?: number;
      renderer?: "canvas" | "svg";
      width?: number | string;
      height?: number | string;
      [key: string]: any;
    };
  }

  export default class ReactECharts extends Component<EChartsReactProps> {
    getEchartsInstance(): ECharts;
  }

  export interface EChartsReactState {
    initialized: boolean;
  }
}

declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}
declare module "echarts-gl";
