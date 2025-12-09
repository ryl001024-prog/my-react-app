declare global {
  namespace AMap {
    type LngLatTuple = [number, number];

    interface MapOptions {
      viewMode?: "2D" | "3D";
      zoom?: number;
      center?: LngLatTuple | LngLat;
    }

    interface MapInstance {
      destroy(): void;
    }

    interface MapConstructor {
      new(container: string | HTMLElement, options?: MapOptions): MapInstance;
    }

    interface LngLat {
      getLng(): number;
      getLat(): number;
    }

    interface LngLatConstructor {
      new(lng: number, lat: number): LngLat;
    }
  }

  interface Window {
    _AMapSecurityConfig?: {
      securityJsCode: string;
    };
    AMap?: {
      Map: AMap.MapConstructor;
      LngLat: AMap.LngLatConstructor;
    };
  }

  const AMap: NonNullable<Window["AMap"]>;
}

declare module "@amap/amap-jsapi-loader" {
  interface AMapLoaderOptions {
    key: string;
    version?: string;
    plugins?: string[];
    AMapUI?: {
      version?: string;
      plugins?: string[];
    };
    Loca?: {
      version?: string;
    };
  }

  interface AMapLoader {
    load(_options: AMapLoaderOptions): Promise<typeof AMap>;
  }

  const loader: AMapLoader;
  export default loader;
}

export { };

