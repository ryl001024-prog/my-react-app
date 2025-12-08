import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home.tsx";
import MapLoadPage from "./pages/MapViewLearn/mapLoad";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/overview" element={<MapLoadPage />} />
      {/*<Route path="/analyze" element={<MapContainer />} />*/}
      {/*<Route path="/project" element={<MapContainer />} />*/}
      {/*<Route path="/team" element={<MapContainer />} />*/}
      {/*<Route path="/settings" element={<MapContainer />} />*/}
    </Routes>
  );
};

export default RouterConfig;
