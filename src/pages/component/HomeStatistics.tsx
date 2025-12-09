import React from "react";
import { Card } from "antd";
import styles from "./HomeStatistics.module.less";

const stats = [
  {
    label: "总用户数",
    value: "12,847",
    change: "+12%",
    changeType: "positive",
    icon: "i-lucide-users"
  },
  {
    label: "今日活跃",
    value: "2,341",
    change: "+8%",
    changeType: "positive",
    icon: "i-lucide-activity"
  },
  {
    label: "系统状态",
    value: "运行中",
    status: "success",
    icon: "i-lucide-shield-check"
  },
  {
    label: "响应时间",
    value: "128ms",
    change: "-5%",
    changeType: "negative",
    icon: "i-lucide-timer"
  }
];

const HomeStatistics: React.FC = () => (
  <div className={styles.container}>
    {stats.map((stat, index) => (
      <Card key={index} className={styles.statCard} hoverable>
        <div className={styles.statContent}>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>{stat.label}</p>
            <p className={styles.statValue}>{stat.value}</p>
            {stat.change && (
              <p
                className={`${styles.statChange} ${
                  stat.changeType === "positive"
                    ? styles.positive
                    : styles.negative
                }`}
              >
                {stat.change} 较昨日
              </p>
            )}
            {stat.status && (
              <p className={`${styles.statChange} ${styles.positive}`}>
                {stat.status}
              </p>
            )}
          </div>
          <div className={styles.statIcon}>
            <div className={`${stat.icon} w-6 h-6`} />
          </div>
        </div>
      </Card>
    ))}
  </div>
);

export default HomeStatistics;
