import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RouterLoading from "@/component/RouterLoading";
import Home from "@/pages/Home.tsx";
// const Home = lazy(() => import("@/pages/Home.tsx"));
const MapLoadPage = lazy(() => import("@/pages/MapViewLearn/mapLoad"));
const MainEcharts = lazy(() => import("@/pages/MapEcharts/mainEcharts"));
const FlightMap = lazy(() => import("@/pages/mapEcharts3D/Flight.tsx"));
const CustomLayout = lazy(() => import("@/pages/layout.tsx"));

const RouterConfig = () => {
  return (
    <Suspense fallback={<RouterLoading />}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/overview" element={<MapLoadPage />} />
        <Route path="/analyze" element={<MainEcharts />} />
        <Route path="/flight" element={<FlightMap />} />
        <Route path="/layout" element={<CustomLayout />} />
      </Routes>
    </Suspense>
  );
};

export default RouterConfig;
