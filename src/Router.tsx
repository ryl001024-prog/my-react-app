import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RouterLoading from "@/component/RouterLoading";

const Home = lazy(() => import("@/pages/Home.tsx"));
const MapLoadPage = lazy(() => import("@/pages/MapViewLearn/mapLoad"));
const MainEcharts = lazy(() => import("@/pages/MapEcharts/mainEchart"));

const RouterConfig = () => {
  return (
    <Suspense fallback={<RouterLoading />}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/overview" element={<MapLoadPage />} /> */}
        <Route path="/overview" element={<MapLoadPage />} />
        <Route path="/analyze" element={<MainEcharts />} />
        {/*<Route path="/project" element={<MapContainer />} />*/}
        {/*<Route path="/team" element={<MapContainer />} />*/}
        {/*<Route path="/settings" element={<MapContainer />} />*/}
      </Routes>
    </Suspense>
  );
};

export default RouterConfig;
