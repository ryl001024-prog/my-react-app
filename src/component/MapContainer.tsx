/// <reference types="@amap/amap-jsapi-types" />
import AMapLoader from "@amap/amap-jsapi-loader";
import { useEffect, forwardRef, useImperativeHandle, useRef } from "react";

export interface MapContainerRef {
  map: AMap.Map | null;
  AMap: typeof AMap | null;
}

const MapContainer = forwardRef<MapContainerRef, any>((_props, ref) => {
  const mapRef = useRef<AMap.Map | null>(null);
  const AMapRef = useRef<typeof AMap | null>(null);

  useImperativeHandle(ref, () => ({
    // 暴露 map 实例，允许父组件直接操作地图
    get map() {
      return mapRef.current;
    },
    // 暴露 AMap 类，允许父组件创建 Marker 等实例
    get AMap() {
      return AMapRef.current;
    },
  }));

  useEffect(() => {
    (window as any)._AMapSecurityConfig = {
      securityJsCode: "cf45ea789265d9b2b02f5d8236999228",
    };
    if (mapRef.current) {
      return;
    }

    AMapLoader.load({
      key: "94f4beca267432fa46b291a478260aa5", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.CitySearch"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    })
      .then((AMapInstance: any) => {
        AMapRef.current = AMapInstance;
        const defaultCenter = new AMapInstance.LngLat(116.397428, 39.90923);
        mapRef.current = new AMapInstance.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 3D 模式在部分插件下会抛异常
          zoom: 10, // 初始化地图级别
          //   mapStyle: "amap://styles/whitesmoke", // 设置地图的显示样式
          center: defaultCenter, // 初始化地图中心点位置
        });
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        mapRef.current?.addControl(new (AMapInstance as any).ToolBar());
        // 比例尺控件展示了地图的比例关系尺，能够直观地反映地图的缩放级别
        mapRef.current?.addControl(new (AMapInstance as any).Scale());
        // map.addControl(new AMapInstance.ElasticMarker());
        // map.addControl(new AMapInstance.OverView());
        (mapRef.current as any)?.plugin("AMap.CitySearch", () => {
          // 实例化城市查询类
          // const citySearch = new AMapInstance.CitySearch();
        });
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      mapRef.current?.destroy();
      mapRef.current = null;
      AMapRef.current = null;
    };
  }, []);

  return <div id="container" className="w-full h-full" />;
});

export default MapContainer;
