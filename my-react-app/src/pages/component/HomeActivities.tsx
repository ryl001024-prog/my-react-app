import React from "react";
import {Button} from "antd";

// 最近活动
const recentActivities = [
  { user: "张三", action: "创建了新项目", time: "2分钟前", avatar: "张" },
  { user: "李四", action: "更新了配置", time: "5分钟前", avatar: "李" },
  { user: "王五", action: "部署了应用", time: "1小时前", avatar: "王" },
  { user: "赵六", action: "完成了任务", time: "2小时前", avatar: "赵" },
];
const HomeActivities: React.FC<any> = () => (
  <div className="lg:col-span-1">
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        最近活动
      </h2>

      <div className="space-y-4 max-h-82 overflow-y-aut no-scrollbar">
        {recentActivities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
              {activity.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-medium">{activity.user}</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {" "}
                  {activity.action}
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full mt-4">
        加载更多活动
      </Button>
    </div>
  </div>
);
export default HomeActivities;
