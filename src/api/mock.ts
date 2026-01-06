// src/api/mock.ts
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive" | "pending";
  createdAt: string;
  lastLogin: string;
  department: string;
  salary: number;
  tags: string[];
  address: {
    city: string;
    street: string;
    zipCode: string;
  };
}

// 明确声明返回类型
export const generateMockData = (): User[] => {
  const data: User[] = [];

  for (let i = 1; i <= 100; i++) {
    const randomDate = new Date(
      Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000),
    );

    data.push({
      id: i,
      name: `用户 ${i}`,
      email: `user${i}@example.com`,
      avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
      role: ["admin", "editor", "viewer"][Math.floor(Math.random() * 3)] as
        | "admin"
        | "editor"
        | "viewer",
      status: ["active", "inactive", "pending"][
        Math.floor(Math.random() * 3)
      ] as "active" | "inactive" | "pending",
      createdAt: randomDate.toISOString(),
      lastLogin: new Date(
        randomDate.getTime() +
          Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
      ).toISOString(),
      department: ["技术部", "市场部", "销售部", "人力资源部", "财务部"][
        Math.floor(Math.random() * 5)
      ],
      salary: Math.floor(8000 + Math.random() * 42000),
      tags: [
        ["全栈", "前端", "后端", "测试", "运维"][Math.floor(Math.random() * 5)],
        ["JavaScript", "TypeScript", "React", "Node.js", "Vue"][
          Math.floor(Math.random() * 5)
        ],
      ],
      address: {
        city: ["北京", "上海", "广州", "深圳", "杭州"][
          Math.floor(Math.random() * 5)
        ],
        street: `${Math.floor(Math.random() * 100) + 1}号街道`,
        zipCode: `1000${Math.floor(Math.random() * 90) + 10}`,
      },
    });
  }

  return data;
};
