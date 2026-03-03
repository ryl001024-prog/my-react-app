import React from "react";
import ReactGridLayout, { useContainerWidth } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const layout = [
  { i: "a", x: 0, y: 0, w: 3, h: 6 }, // 不要 static:true，否则不能拖拽/缩放
  { i: "b", x: 3, y: 0, w: 6, h: 6, minW: 2, maxW: 8 },
  { i: "c", x: 9, y: 0, w: 3, h: 6 },
];

const RevenueAnalysis: React.FC = () => {
  const { width, containerRef, mounted } = useContainerWidth(); // v2 推荐
  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {mounted && (
        <ReactGridLayout
          width={width}
          layout={layout}
          gridConfig={{
            cols: 12,
            rowHeight: 30,
            margin: [10, 10],
            containerPadding: [10, 10],
          }}
          dragConfig={{ enabled: true }}
          resizeConfig={{ enabled: true, handles: ["e", "se", "s"] }} // 右侧/右下角可拉伸“宽度”
          //   compactor={undefined} // 如不想被自动“往上挤”，可关闭
        >
          <div key="a" style={{ border: "1px solid red" }}>
            a
          </div>
          <div key="b" style={{ border: "1px solid blue" }}>
            b
          </div>
          <div key="c" style={{ border: "1px solid green" }}>
            c
          </div>
        </ReactGridLayout>
      )}
    </div>
  );
};

export default RevenueAnalysis;
