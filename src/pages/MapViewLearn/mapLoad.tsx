import MapContainer, { MapContainerRef } from "@/component/MapContainer";
import { Button, Input, App } from "antd";
import { useEffect, useRef, useState } from "react";
import "./mapAutoComplete.css";
import styles from "./mapLoad.module.less";

const MapLoadPage = () => {
  const mapRef = useRef<MapContainerRef>(null);
  const { message } = App.useApp();
  const handleSearchLocation = (poi: any) => {
    const AMapInstance = mapRef.current?.AMap;
    const mapInstance = mapRef.current?.map;

    if (!AMapInstance || !mapInstance) {
      message.warning("地图还未加载完成，请稍后再试");
      return;
    }

    if (!poi || !poi.location) {
      message.warning("无效的位置信息");
      return;
    }
    message.success(`找到: ${poi.name}`);

    // 将地图中心移动到搜索结果位置
    mapInstance.setZoomAndCenter(16, [poi.location.lng, poi.location.lat]);

    // 添加标记
    const marker = new (AMapInstance as any).Marker({
      position: poi.location,
      title: poi.name,
    });
    mapInstance.add(marker);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const mapInstance = mapRef.current?.map;
      if (mapInstance) {
        console.log("地图已加载完成");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      <SearchForm onSelect={handleSearchLocation} mapRef={mapRef} />
      <MapContainer ref={mapRef} />
    </div>
  );
};

const SearchForm = ({
  onSelect,
  mapRef,
}: {
  onSelect: (_poi: any) => void;
  mapRef: React.RefObject<MapContainerRef | null>;
}) => {
  const [keywords, setKeywords] = useState("");
  const inputRef = useRef<any>(null);
  const autoCompleteRef = useRef<any>(null);
  const { message } = App.useApp();

  useEffect(() => {
    // 等待 AMap 加载完成
    const timer = setTimeout(() => {
      const AMapInstance = mapRef.current?.AMap;
      if (!AMapInstance || !inputRef.current) {
        return;
      }

      // 创建 AMap.AutoComplete 实例
      const autoComplete = new (AMapInstance as any).AutoComplete({
        input: inputRef.current.input,
        city: mapRef.current?.CurrentInfo?.city || "全国",
      });

      autoCompleteRef.current = autoComplete;
      // 监听选择事件
      autoComplete.on("select", (e: any) => {
        const poi = e.poi;

        if (poi && poi.location) {
          setKeywords(poi.name);
          onSelect(poi);
        } else {
          const placeSearch = new (AMapInstance as any).PlaceSearch({
            city: mapRef.current?.CurrentInfo?.city || "全国",
          });

          placeSearch.search(poi.name, (status: string, result: any) => {
            if (
              status === "complete" &&
              result.poiList &&
              result.poiList.pois.length > 0
            ) {
              const detailedPoi = result.poiList.pois[0];
              setKeywords(detailedPoi.name);
              onSelect(detailedPoi);
            }
          });
        }
      });
    }, 1500);

    return () => {
      clearTimeout(timer);
      if (autoCompleteRef.current) {
        autoCompleteRef.current.off("select");
        // 断开 observer
        if ((autoCompleteRef.current as any).observer) {
          (autoCompleteRef.current as any).observer.disconnect();
        }
      }
    };
  }, [mapRef, onSelect]);

  const handleSearch = () => {
    if (!keywords) {
      message.warning("请输入搜索关键字");
      return;
    }

    const AMapInstance = mapRef.current?.AMap;
    if (!AMapInstance) {
      message.warning("地图还未加载完成");
      return;
    }

    const placeSearch = new (AMapInstance as any).PlaceSearch({
      city: mapRef.current?.CurrentInfo?.city || "全国",
    });

    placeSearch.search(keywords, (status: string, result: any) => {
      if (
        status === "complete" &&
        result.poiList &&
        result.poiList.pois.length > 0
      ) {
        const firstPoi = result.poiList.pois[0];
        onSelect(firstPoi);
      } else {
        message.error("未找到相关地点");
      }
    });
  };

  return (
    <div className={styles.searchFormContainer}>
      <div className={styles.searchFormContent}>
        <Input
          ref={inputRef}
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="🔍 搜索地点 (如: 北京天安门、上海外滩)"
          className={styles.searchInput}
          size="large"
          onPressEnter={handleSearch}
          allowClear
        />
        <Button
          type="primary"
          size="large"
          onClick={handleSearch}
          className={styles.searchButton}
        >
          搜索
        </Button>
      </div>
    </div>
  );
};

export default MapLoadPage;
