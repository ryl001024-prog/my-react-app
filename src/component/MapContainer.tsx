/// <reference types="@amap/amap-jsapi-types" />
import AMapLoader from "@amap/amap-jsapi-loader";
import {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { App } from "antd";

(window as any)._AMapSecurityConfig = {
  securityJsCode: "b2c30ca0ca6b2fcab1c480374dd756bb",
};

export interface MapContainerRef {
  map: AMap.Map | null;
  AMap: typeof AMap | null;
  CurrentInfo: CurrentCity;
}

type CurrentCity = {
  city?: string;
  bounds?: AMap.Bounds;
  citycode?: string | number;
  adcode?: string | number;
};

const MapContainer = forwardRef<MapContainerRef, any>((_props, ref) => {
  const mapRef = useRef<AMap.Map | null>(null);
  const AMapRef = useRef<typeof AMap | null>(null);
  const { message } = App.useApp();
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
    },
  }));

  useEffect(() => {
    if (mapRef.current) {
      return;
    }

    let isMounted = true; // 添加标志防止重复执行

    AMapLoader.load({
      key: "e2ff8a247cba0a555e39d4704066210d", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [
        "AMap.Scale",
        "AMap.ToolBar",
        "AMap.CitySearch",
        "AMap.PlaceSearch",
        "AMap.AutoComplete",
        "AMap.Geolocation",
      ], //需要使用的的插件列表
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
          center: defaultCenter, // 初始化地图中心点位置
        });
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        mapRef.current?.addControl(new (AMapInstance as any).ToolBar());
        // 比例尺控件展示了地图的比例关系尺，能够直观地反映地图的缩放级别
        mapRef.current?.addControl(new (AMapInstance as any).Scale());

        const geolocation = new (AMapInstance as any).Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 30000, // 超过30秒后停止定位
          position: "RB", // 定位按钮的停靠位置
          offset: [10, 20], // 定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
          zoomToAccuracy: true, // 定位成功后是否自动调整地图视野到定位点
          needAddress: true, // 是否需要将定位结果进行逆地理编码操作
        });

        // 同时添加定位控件
        mapRef.current?.addControl(geolocation);

        geolocation.getCurrentPosition((status: string, result: any) => {
          if (!isMounted) return;
          if (status === "complete") {
            // 定位成功
            console.log("定位成功:", result);
            setCurrentInfo({
              city:
                result.addressComponent?.city ||
                result.addressComponent?.province,
              adcode: result.addressComponent?.adcode,
              citycode: result.addressComponent?.citycode,
              bounds: undefined, // Geolocation 结果不直接包含 bounds，但定位自动跳转了
            });
            message.success(
              `定位成功: ${result.addressComponent?.city || result.addressComponent?.province}`,
            );
          } else {
            // 定位失败 - 降级处理
            console.warn("定位失败:", result);
            message.warning("定位超时/失败，已切换到默认城市（北京）");

            // 设置默认城市信息
            setCurrentInfo({
              city: "北京市",
              adcode: "110000",
              citycode: "010",
            });
            // 移动地图到北京
            mapRef.current?.setZoomAndCenter(10, [116.397428, 39.90923]);
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
  }, [message]);

  return <div id="container" className="w-full h-full" />;
});

export default MapContainer;
