/// <reference types="@amap/amap-jsapi-types" />
import AMapLoader from "@amap/amap-jsapi-loader";
import { message } from "antd";
import { useEffect, forwardRef, useImperativeHandle, useRef, useState } from "react";

export interface MapContainerRef {
  map: AMap.Map | null;
  AMap: typeof AMap | null;
  CurrentInfo: CurrentCity
}

type CurrentCity = {
  city?: string,
  bounds?: AMap.Bounds,
  citycode?: string | number,
  adcode?: string | number
}

const MapContainer = forwardRef<MapContainerRef, any>((_props, ref) => {
  const mapRef = useRef<AMap.Map | null>(null);
  const AMapRef = useRef<typeof AMap | null>(null);
  const [CurrentInfo, setCurrentInfo] = useState<CurrentCity>({});
  useImperativeHandle(ref, () => ({
    // 暴露 map 实例，允许父组件直接操作地图
    get map() {
      return mapRef.current;
    },
    // 暴露 AMap 类，允许父组件创建 Marker 等实例
    get AMap() {
      return AMapRef.current;
    },

    get CurrentInfo() {
      return CurrentInfo;
    }
  }));

  useEffect(() => {
    (window as any)._AMapSecurityConfig = {
      securityJsCode: "cf45ea789265d9b2b02f5d8236999228"
    };
    if (mapRef.current) {
      return;
    }

    let isMounted = true; // 添加标志防止重复执行

    AMapLoader.load({
      key: "94f4beca267432fa46b291a478260aa5", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.CitySearch", "AMap.PlaceSearch", "AMap.AutoComplete"] //需要使用的的插件列表
    })
      .then((AMapInstance: any) => {
        if (!isMounted) return; // 如果组件已卸载，不执行后续操作

        AMapRef.current = AMapInstance;
        const defaultCenter = new AMapInstance.LngLat(116.397428, 39.90923);
        mapRef.current = new AMapInstance.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 3D 模式在部分插件下会抛异常
          zoom: 10, // 初始化地图级别
          //   mapStyle: "amap://styles/whitesmoke", // 设置地图的显示样式
          center: defaultCenter // 初始化地图中心点位置
        });
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        mapRef.current?.addControl(new (AMapInstance as any).ToolBar());
        // 比例尺控件展示了地图的比例关系尺，能够直观地反映地图的缩放级别
        mapRef.current?.addControl(new (AMapInstance as any).Scale());

        // 使用 AMap.CitySearch 获取当前城市信息（基于 IP 定位）
        const citySearch = new (AMapInstance as any).CitySearch();
        citySearch.getLocalCity((status: string, result: any) => {
          if (!isMounted) return; // 如果组件已卸载，不显示消息
          if (status === "complete" && result.info === "OK") {
            setCurrentInfo(result);
            message.success(`当前城市: ${result.city}`);
            // 可选：将地图中心移动到该城市
            const mapInstance = mapRef.current;
            if (mapInstance && result.bounds) {
              mapInstance.setBounds(result.bounds);
            }
          } else {
            message.error("获取城市信息失败");
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      isMounted = false; // 组件卸载时设置标志
      mapRef.current?.destroy();
      mapRef.current = null;
      AMapRef.current = null;
    };
  }, []);

  return <div id="container" className="w-full h-full" />;
});

export default MapContainer;
