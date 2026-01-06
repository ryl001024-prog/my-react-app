export const getCssVariable = (variable: string): string => {
  if (typeof window !== "undefined") {
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim() || "#1890ff"
    ); // 默认颜色
  }
  return "#1890ff";
};
