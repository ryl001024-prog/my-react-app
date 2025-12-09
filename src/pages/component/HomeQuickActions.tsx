import React from "react";
import { Card } from "antd";
import styles from "./HomeQuickActions.module.less";

const quickActions = [
  { name: "新建项目", icon: "i-lucide-plus", color: "bg-blue-500" },
  { name: "数据分析", icon: "i-lucide-bar-chart-3", color: "bg-green-500" },
  { name: "系统设置", icon: "i-lucide-settings", color: "bg-purple-500" },
  { name: "团队管理", icon: "i-lucide-users", color: "bg-orange-500" },
];

const HomeQuickActions: React.FC = () => {
  return (
    <Card className={styles.card}>
      <h2 className={styles.title}>快速操作</h2>
      <div className={styles.actionsGrid}>
        {quickActions.map((action, index) => (
          <Card key={index} className={styles.actionCard} hoverable>
            <div className={`${styles.actionIcon} ${action.color}`}>
              <div className={`${action.icon} w-6 h-6 text-white`} />
            </div>
            <span className={styles.actionText}>{action.name}</span>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default HomeQuickActions;
