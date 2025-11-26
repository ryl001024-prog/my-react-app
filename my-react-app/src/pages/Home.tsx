import HomeNav from "@/pages/component/HomeNav.tsx";
import HomeStatistics from "@/pages/component/HomeStatistics.tsx";
import HomeCore from "@/pages/component/HomeCore.tsx";
import HomeActivities from "@/pages/component/HomeActivities.tsx";
import {Card} from "antd";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 导航栏 */}
      <HomeNav />
      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 欢迎区域 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            欢迎回来！
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            这里是您的控制台总览，查看最新动态和关键指标。
          </p>
        </div>
        {/* 统计卡片网格 */}
        <HomeStatistics />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* 左侧：功能特性 */}
          <HomeCore />
          {/* 右侧：最近活动 */}
          <HomeActivities />
        </div>

        {/* 快速操作区域 */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            快速操作
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "新建项目", icon: "i-lucide-plus", color: "bg-blue-500" },
              {
                name: "数据分析",
                icon: "i-lucide-bar-chart-3",
                color: "bg-green-500",
              },
              {
                name: "系统设置",
                icon: "i-lucide-settings",
                color: "bg-purple-500",
              },
              {
                name: "团队管理",
                icon: "i-lucide-users",
                color: "bg-orange-500",
              },
            ].map((action, index) => (
              <Card
                key={index}
                className="flex flex-col items-center justify-center rounded-lg hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  <div className={`${action.icon} w-6 h-6 text-white`} />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                  {action.name}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="mt-12 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="i-lucide-zap w-4 h-4 text-white" />
              </div>
              <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
                TechPortal
              </span>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-600 dark:text-gray-400">
              © 2024 TechPortal. 保留所有权利。
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
