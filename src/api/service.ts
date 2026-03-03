import express, { Request, Response, NextFunction } from "express";
import { generateMockData } from "./mock";

// ================ 类型定义 ================
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  department: string;
  status: "active" | "inactive" | "pending";
  salary: number;
  createdAt: string;
}

interface Filters {
  name?: string;
  role?: User["role"];
  department?: string;
  status?: User["status"];
}

interface Sort {
  field: keyof User | "id"; // 允许排序字段
  order: "asc" | "desc";
}

interface PaginationRequest {
  page?: number;
  pageSize?: number;
  filters?: Filters;
  sort?: Sort;
}

interface PaginationResponse {
  current: number;
  pageSize: number;
  total: number;
  totalPage: number;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  pagination?: PaginationResponse;
  filters?: Filters;
  sort?: Sort;
  message?: string;
  error?: string;
}

// ================ 服务配置 ================
const PORT = 3002;
const HOST = "127.0.0.1";
const service = express();

// ================ 中间件配置 ================
service.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(
    `[${new Date().toLocaleTimeString()}] ${req.method} ${req.url} - Origin: ${req.headers.origin || "None"}`,
  );
  next();
});

// 使用更加鲁棒的手动 CORS 处理
service.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  // 允许所有源（在该 Mock 服务中安全）
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With",
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // 处理预检请求 (Preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

service.use(express.json());

// ================ 路由定义 ================
// 根路由 - 修复：移除重复的响应调用
service.get("/", (_req: Request, res: Response) => {
  res.json({ content: "Hello World from Mock API Server!" });
});

// 模拟数据库
const mockDatabase = {
  users: generateMockData() as User[],
  total: 100,
};

// POST 端点 - 支持分页、过滤和排序
service.post<object, ApiResponse<User[]>, PaginationRequest>(
  "/api/users",
  (req, res) => {
    try {
      const {
        page = 1,
        pageSize = 20,
        filters = {},
        sort = { field: "id", order: "asc" },
      } = req.body;
      let filteredData = [...mockDatabase.users];

      // 应用过滤条件
      if (filters.name) {
        filteredData = filteredData.filter((user) =>
          user.name.toLowerCase().includes((filters.name ?? "").toLowerCase()),
        );
      }

      if (filters.role) {
        filteredData = filteredData.filter(
          (user) => user.role === filters.role,
        );
      }

      if (filters.department) {
        filteredData = filteredData.filter((user) =>
          user.department.includes(filters?.department ?? ""),
        );
      }

      if (filters.status) {
        filteredData = filteredData.filter(
          (user) => user.status === filters.status,
        );
      }

      // 应用排序
      filteredData.sort((a, b: any) => {
        if (a[sort.field] < b[sort.field]) return sort.order === "asc" ? -1 : 1;
        if (a[sort.field] > b[sort.field]) return sort.order === "asc" ? 1 : -1;
        return 0;
      });

      // 分页
      const total = filteredData.length;
      const startIndex = (page - 1) * pageSize;
      const paginatedData = filteredData.slice(
        startIndex,
        startIndex + pageSize,
      );

      // 模拟网络延迟
      setTimeout(() => {
        res.json({
          success: true,
          data: paginatedData,
          pagination: {
            current: page,
            pageSize: pageSize,
            total,
            totalPage: Math.ceil(total / pageSize),
          },
          filters,
          sort,
        } satisfies ApiResponse<User[]>);
      }, 300);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      res.status(500).json({
        success: false,
        message: "服务器内部错误",
        error: errorMessage,
      } satisfies ApiResponse<never>);
    }
  },
);

// 健康检查端点
service.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Mock API 服务正常运行",
    dataCount: mockDatabase.total,
    timestamp: new Date().toISOString(),
  });
});

// ================ 服务器启动 ================
service.listen(PORT, HOST, () => {
  console.log(`✅ 模拟API服务已启动: http://${HOST}:${PORT}`);
  console.log(`📚 可用端点:`);
  console.log(`   GET  /              - 服务欢迎信息`);
  console.log(`   GET  /api/health   - 服务健康检查`);
  console.log(`   POST /api/users   - 获取用户数据（支持分页/过滤/排序）`);
  console.log(``);
  console.log(`💡 使用示例:`);
  console.log(`curl -X POST http://${HOST}:${PORT}/api/users \\`);
  console.log(`  -H "Content-Type: application/json" \\`);
  console.log(`  -d '{`);
  console.log(`    "page": 1,`);
  console.log(`    "pageSize": 5,`);
  console.log(`    "filters": { "department": "技术部" },`);
  console.log(`    "sort": { "field": "salary", "order": "desc" }`);
  console.log(`  }'`);
});

// ================ 优雅关闭（移除以便排查） ================
// process.on("SIGINT", () => {
//   console.log("\n🛑 正在关闭模拟API服务...");
//   process.exit(0);
// });

// ================ 类型守卫（可选） ================
export function isSort(value: any): value is Sort {
  return (
    value &&
    typeof value === "object" &&
    ["asc", "desc"].includes(value.order) &&
    typeof value.field === "string"
  );
}
