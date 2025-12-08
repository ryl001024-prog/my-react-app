import MapContainer, { MapContainerRef } from "@/component/MapContainer";
import { Button, message } from "antd";
import Input from "antd/es/input/Input";
import { useEffect, useRef } from "react";

const MapLoadPage = () => {
  const mapRef = useRef<MapContainerRef>(null);

  const handleSearchLocation = () => {
    const AMapInstance = mapRef.current?.AMap;
    if (!AMapInstance) {
      message.warning("地图还未加载完成，请稍后再试");
      return;
    }

    // 使用 AMap.CitySearch 获取当前城市信息（基于 IP 定位）
    const citySearch = new (AMapInstance as any).CitySearch();
    citySearch.getLocalCity((status: string, result: any) => {
      console.log("CitySearch status:", status);
      console.log("CitySearch result:", result);

      if (status === "complete" && result.info === "OK") {
        console.log("城市信息:", result);
        console.log("城市名称:", result.city);
        console.log("城市编码:", result.citycode);
        console.log("行政区编码:", result.adcode);
        console.log("矩形范围:", result.bounds);

        message.success(`当前城市: ${result.city}`);

        // 可选：将地图中心移动到该城市
        const mapInstance = mapRef.current?.map;
        if (mapInstance && result.bounds) {
          mapInstance.setBounds(result.bounds);
        }
      } else {
        console.log("获取城市信息失败");
        message.error("获取城市信息失败");
      }
    });
  };

  useEffect(() => {
    // 等待地图加载完成后可以执行一些初始化操作
    const timer = setTimeout(() => {
      const mapInstance = mapRef.current?.map;
      if (mapInstance) {
        console.log("地图已加载完成");
        // 可以在这里设置初始中心点
        // mapInstance.setCenter([116.397428, 39.90923]);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      <SearchForm onSearch={handleSearchLocation} />
      <MapContainer ref={mapRef} />
    </div>
  );
};

const SearchForm = ({ onSearch }: { onSearch: () => void }) => {
  return (
    <div className="grid grid-cols-10 gap-4 p-2 bg-white justify-between">
      <Input placeholder="请输入搜索内容" className="col-span-3" />
      <Button type="primary" className="col-span-1" onClick={onSearch}>
        搜索
      </Button>
    </div>
  );
};

export default MapLoadPage;
