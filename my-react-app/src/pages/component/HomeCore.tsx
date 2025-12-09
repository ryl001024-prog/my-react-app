import React from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
const features = [
  {
    icon: "i-lucide-globe",
    title: "全球覆盖",
    description: "服务覆盖全球200+国家和地区",
    color: "bg-gradient-to-r from-blue-500 to-cyan-500",
  },
  {
    icon: "i-lucide-shield",
    title: "安全可靠",
    description: "企业级安全防护，数据加密传输",
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
  },
  {
    icon: "i-lucide-zap",
    title: "极速体验",
    description: "毫秒级响应，优化用户体验",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    icon: "i-lucide-bar-chart-3",
    title: "智能分析",
    description: "深度数据分析，助力业务决策",
    color: "bg-gradient-to-r from-orange-500 to-red-500",
  },
];
const HomeStatistics: React.FC<any> = () => (
  <div className="lg:col-span-2 h-full">
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          核心功能
        </h2>
        <Button
          className="flex items-center"
          icon={<ArrowRightOutlined />}
          iconPlacement={"end"}
        >
          <span>查看全部</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div
              className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
            >
              <div className={`${feature.icon} w-6 h-6 text-white`} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default HomeStatistics;
