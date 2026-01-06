import React, { useEffect, useRef, useState, useCallback } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import "echarts-gl";
import styles from "./index.module.less";

// 定义数据结构接口
interface Airport {
  coord: [number, number];
}

interface FlightData {
  airports: [number, number, string, number, number][]; // [id, ? , name, lon, lat]
  routes: [number, number, number][]; // [airlineIndex, sourceAirportIndex, destinationAirportIndex]
  airlines: [string, string][]; // [name, code]
}

interface RoutesGroupByAirline {
  [airlineName: string]: [number, number, number][];
}

interface GlobeOption extends echarts.EChartsOption {
  globe?: {
    environment?: string;
    heightTexture?: string;
    displacementScale?: number;
    displacementQuality?: "low" | "medium" | "high" | "ultra";
    baseColor?: string;
    shading?: "color" | "lambert" | "realistic";
    realisticMaterial?: {
      roughness?: number;
      metalness?: number;
    };
    postEffect?: {
      enable?: boolean;
      bloom?: {
        enable?: boolean;
        bloomIntensity?: number;
      };
      depthOfField?: {
        enable?: boolean;
        focalDistance?: number;
      };
    };
    temporalSuperSampling?: {
      enable?: boolean;
    };
    light?: {
      ambient?: {
        intensity?: number;
      };
      main?: {
        intensity?: number;
        shadow?: boolean;
      };
      ambientCubemap?: {
        texture?: string;
        exposure?: number;
        diffuseIntensity?: number;
        specularIntensity?: number;
      };
    };
    viewControl?: {
      autoRotate?: boolean;
      autoRotateAfterStill?: number;
      rotateSensitivity?: number;
      zoomSensitivity?: number;
      panSensitivity?: number;
      distance?: number;
    };
    silent?: boolean;
  };
}

interface Lines3DSeries {
  type: "lines3D";
  name: string;
  effect: {
    show: boolean;
    trailWidth: number;
    trailLength: number;
    trailOpacity: number;
    trailColor: string;
  };
  lineStyle: {
    width: number;
    color: string;
    opacity: number;
  };
  blendMode: string;
  data: any[];
}

interface Scatter3DSeries {
  type: "scatter3D";
  coordinateSystem: "globe";
  blendMode: string;
  symbolSize: number;
  itemStyle: {
    color: string;
    opacity: number;
  };
  data: number[][];
}

const FlightMap: React.FC = () => {
  const chartRef = useRef<ReactECharts>(null);
  const [option, setOption] = useState<GlobeOption | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getAirportCoord = useCallback(
    (data: FlightData, idx: number): [number, number] => {
      return [data.airports[idx][3], data.airports[idx][4]];
    },
    [],
  );

  const handleKeyDown = useCallback(() => {
    if (chartRef.current && option?.series) {
      const chartInstance = chartRef.current.getEchartsInstance();
      (option.series as any[]).forEach((_, idx) => {
        chartInstance.dispatchAction({
          type: "lines3DToggleEffect",
          seriesIndex: idx,
        });
      });
    }
  }, [option]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const ROOT_PATH = "https://echarts.apache.org/examples";
        const response = await fetch(
          `${ROOT_PATH}/data-gl/asset/data/flights.json`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: FlightData = await response.json();
        processData(data, ROOT_PATH);
      } catch (err) {
        console.error("加载数据时出错:", err);
        setError(err instanceof Error ? err.message : "未知错误");
      } finally {
        setLoading(false);
      }
    };

    const processData = (data: FlightData, ROOT_PATH: string) => {
      // 处理机场数据
      const airports: Airport[] = data.airports.map((item) => ({
        coord: [item[3], item[4]],
      }));

      // 按航空公司分组航线
      const routesGroupByAirline: RoutesGroupByAirline = {};
      data.routes.forEach((route) => {
        const airline = data.airlines[route[0]];
        const airlineName = airline[0];
        if (!routesGroupByAirline[airlineName]) {
          routesGroupByAirline[airlineName] = [];
        }
        routesGroupByAirline[airlineName].push(route);
      });

      // 准备点数据
      const pointsData: number[][] = [];
      data.routes.forEach((route) => {
        pointsData.push(getAirportCoord(data, route[1]));
        pointsData.push(getAirportCoord(data, route[2]));
      });

      // 创建航线系列
      const linesSeries: Lines3DSeries[] = data.airlines
        .map((airline) => {
          const airlineName = airline[0];
          const routes = routesGroupByAirline[airlineName];
          if (!routes) return null;

          return {
            type: "lines3D",
            name: airlineName,
            effect: {
              show: true,
              trailWidth: 2,
              trailLength: 0.15,
              trailOpacity: 1,
              trailColor: "rgb(30, 30, 60)",
            },
            lineStyle: {
              width: 1,
              color: "rgb(50, 50, 150)",
              opacity: 0.1,
            },
            blendMode: "lighter",
            data: routes.map((route) => [
              airports[route[1]].coord,
              airports[route[2]].coord,
            ]) as any,
          };
        })
        .filter((series): series is any => !!series);

      // 创建散点系列
      const scatterSeries: Scatter3DSeries = {
        type: "scatter3D",
        coordinateSystem: "globe",
        blendMode: "lighter",
        symbolSize: 2,
        itemStyle: {
          color: "rgb(50, 50, 150)",
          opacity: 0.2,
        },
        data: pointsData,
      };

      // 配置图表选项
      const chartOption: GlobeOption = {
        legend: {
          selectedMode: "single",
          left: "left",
          data: Object.keys(routesGroupByAirline),
          orient: "vertical",
          textStyle: {
            color: "#fff",
          },
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: [5, 10],
          borderRadius: 4,
          selector: ["all", "inverse"] as any,
          selectorLabel: {
            color: "#fff",
          },
        },
        globe: {
          environment: `${ROOT_PATH}/data-gl/asset/starfield.jpg`,
          heightTexture: `${ROOT_PATH}/data-gl/asset/bathymetry_bw_composite_4k.jpg`,
          displacementScale: 0.1,
          displacementQuality: "high",
          baseColor: "#000",
          shading: "realistic",
          realisticMaterial: {
            roughness: 0.2,
            metalness: 0,
          },
          postEffect: {
            enable: true,
            bloom: {
              enable: true,
              bloomIntensity: 0.5,
            },
          },
          temporalSuperSampling: {
            enable: true,
          },
          light: {
            ambient: {
              intensity: 0,
            },
            main: {
              intensity: 0.1,
              shadow: false,
            },
            ambientCubemap: {
              texture: `${ROOT_PATH}/data-gl/asset/lake.hdr`,
              exposure: 1,
              diffuseIntensity: 0.5,
              specularIntensity: 2,
            },
          },
          viewControl: {
            autoRotate: true,
            autoRotateAfterStill: 3,
            rotateSensitivity: 0.5,
            zoomSensitivity: 1,
            panSensitivity: 1,
            distance: 150,
          },
        },
        series: [...linesSeries, scatterSeries] as any[],
        backgroundColor: "#000",
      } as any;

      setOption(chartOption);
    };

    fetchData();

    // 添加键盘事件监听
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [getAirportCoord, handleKeyDown]);

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>加载失败: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>加载飞行数据中...</p>
        </div>
      )}

      {option && (
        <ReactECharts
          ref={chartRef}
          option={option}
          style={{ height: "100%", width: "100%" }}
          opts={{ renderer: "canvas", width: "auto", height: "auto" }}
          notMerge={true}
          lazyUpdate={true}
          theme="dark"
        />
      )}

      <div className={styles.instructions}>
        <p>• 拖拽旋转地球</p>
        <p>• 滚轮缩放</p>
        <p>• 点击图例筛选航空公司</p>
        <p>• 按任意键切换飞行效果</p>
      </div>
    </div>
  );
};

export default FlightMap;
