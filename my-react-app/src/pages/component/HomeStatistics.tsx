
// 统计数据
import React from "react";

const stats = [
    {
        label: "总用户数",
        value: "12,847",
        change: "+12%",
        changeType: "positive",
        icon: "i-lucide-users",
    },
    {
        label: "今日活跃",
        value: "2,341",
        change: "+8%",
        changeType: "positive",
        icon: "i-lucide-activity",
    },
    {
        label: "系统状态",
        value: "运行中",
        status: "success",
        icon: "i-lucide-shield-check",
    },
    {
        label: "响应时间",
        value: "128ms",
        change: "-5%",
        changeType: "negative",
        icon: "i-lucide-timer",
    },
];

const HomeStatistics: React.FC<any> = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {stats.map((stat, index) => (
      <div
        key={index}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.label}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {stat.value}
            </p>
            {stat.change && (
              <p
                className={`text-sm mt-1 ${
                  stat.changeType === "positive"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {stat.change} 较昨日
              </p>
            )}
            {stat.status && (
              <p className="text-sm mt-1 text-green-600 dark:text-green-400">
                {stat.status}
              </p>
            )}
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <div
              className={`${stat.icon} w-6 h-6 text-blue-600 dark:text-blue-400`}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default HomeStatistics;
