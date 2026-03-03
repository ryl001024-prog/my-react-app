import { useState, useEffect } from "react";

interface TableScrollOptions {
  headerHeight?: number; // 顶部导航栏高度
  tableTitleHeight?: number; // 表格标题高度 (0表示无标题)
  paginationHeight?: number; // 分页栏高度
  footerHeight?: number; // 底部状态栏高度 (0表示无页脚)
  margin?: number; // 额外边距
  minHeight?: number; // 最小高度
  maxHeight?: number; // 最大高度
}

export const useTableScrollHeight = ({
  headerHeight = 64,
  tableTitleHeight = 55,
  paginationHeight = 50,
  footerHeight = 50,
  margin = 0,
  minHeight = 300,
  maxHeight = Infinity,
}: TableScrollOptions = {}) => {
  const [height, setHeight] = useState(minHeight);

  useEffect(() => {
    const calculateHeight = () => {
      const viewportHeight = window.innerHeight;

      // 动态计算总扣除高度
      const totalDeduction =
        headerHeight +
        (tableTitleHeight || 0) +
        paginationHeight +
        (footerHeight || 0) +
        margin;

      let calculatedHeight = viewportHeight - totalDeduction;

      // 应用最小/最大高度限制
      calculatedHeight = Math.max(minHeight, calculatedHeight);
      if (maxHeight !== Infinity) {
        calculatedHeight = Math.min(calculatedHeight, maxHeight);
      }

      setHeight(calculatedHeight);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => window.removeEventListener("resize", calculateHeight);
  }, [
    headerHeight,
    tableTitleHeight,
    paginationHeight,
    footerHeight,
    margin,
    minHeight,
    maxHeight,
  ]);

  return height;
};
