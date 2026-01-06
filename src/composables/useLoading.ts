import { useState, useCallback, useEffect, useRef } from "react";

export function useLoading() {
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const wrapLoading = useCallback(<T>(fn: () => Promise<T> | T): Promise<T> => {
    // 立即执行的 async 函数
    const execute = async () => {
      // 仅在组件挂载时更新 loading 状态
      if (isMounted.current) {
        setLoading(true);
      }

      try {
        return await fn();
      } finally {
        // 仅在组件挂载时清除 loading 状态
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    return execute();
  }, []);

  return {
    loading,
    wrapLoading,
  };
}
