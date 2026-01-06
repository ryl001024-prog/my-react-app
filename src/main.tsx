import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App as AntdApp } from "antd";
import "./index.less";
import "./styles/theme.less";
import "uno.css";
import App from "./App.js";

createRoot(document.getElementById("root")!).render(
  <AntdApp>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AntdApp>,
);
