import { useMemo } from "react";

interface ArrayToMapOptions<T, K, V> {
  /**
   * 自定义 key 提取函数
   * 默认使用数组项的 id 属性或索引作为 key
   */
  getKey?: (item: T, index: number) => K;

  /**
   * 自定义 value 提取函数
   * 默认使用整个数组项作为 value
   */
  getValue?: (item: T, index: number) => V;

  /**
   * 当出现重复 key 时的处理策略
   * 'overwrite': 覆盖已存在的值（默认）
   * 'ignore': 保留已存在的值，忽略新值
   * 'throw': 抛出错误
   */
  onDuplicateKey?: "overwrite" | "ignore" | "throw";
}

/**
 * 将数组转换为 Map 的 Hook
 * @param array 要转换的数组
 * @param options 配置选项
 * @returns 转换后的 Map
 */
export function useArrayToMap<T, K = string | number, V = T>(
  array: T[],
  options?: ArrayToMapOptions<T, K, V>,
): Map<K, V> {
  return useMemo(() => {
    const {
      getKey = (item: any, index: number) => item?.id ?? index,
      getValue = (item: T) => item as unknown as V,
      onDuplicateKey = "overwrite",
    } = options || {};

    const map = new Map<K, V>();

    array.forEach((item, index) => {
      const key = getKey(item, index);
      const value = getValue(item, index);

      if (map.has(key)) {
        switch (onDuplicateKey) {
          case "ignore":
            return; // 跳过当前项
          case "throw":
            throw new Error(`Duplicate key found: ${key}`);
          case "overwrite":
          default:
            map.set(key, value);
        }
      } else {
        map.set(key, value);
      }
    });

    return map;
  }, [array, options]); // 依赖项包括数组和配置选项
}

/**
 * 快速使用的便捷 Hook，根据指定属性生成 Map
 * @param array 要转换的数组
 * @param keyProp 作为 key 的属性名
 * @returns 转换后的 Map
 */
export function useArrayToMapByKey<
  T extends Record<string, any>,
  K extends keyof T,
>(array: T[], keyProp: K): Map<T[K], T> {
  return useArrayToMap(array, {
    getKey: (item) => item[keyProp],
  });
}

/**
 * 使用索引作为 key 的便捷 Hook
 * @param array 要转换的数组
 * @returns 转换后的 Map
 */
export function useArrayToMapByIndex<T>(array: T[]): Map<number, T> {
  return useArrayToMap(array, {
    getKey: (_, index) => index,
  });
}
