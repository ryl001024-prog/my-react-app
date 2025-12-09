import React from "react";
import { Card, Avatar, Button } from "antd";
import styles from "./HomeActivities.module.less";

const recentActivities = [
  { user: "张三", action: "创建了新项目", time: "2分钟前", avatar: "张" },
  { user: "李四", action: "更新了配置", time: "5分钟前", avatar: "李" },
  { user: "王五", action: "部署了应用", time: "1小时前", avatar: "王" },
  { user: "赵六", action: "完成了任务", time: "2小时前", avatar: "赵" }
];

const HomeActivities: React.FC = () => (
  <div className={styles.container}>
    <Card className={styles.card}>
      <h2 className={styles.title}>最近活动</h2>

      <div className={styles.activityList}>
        {recentActivities.map((activity, index) => (
          <div key={index} className={styles.activityItem}>
            <div className={styles.activityContent}>
              <Avatar
                className={styles.activityAvatar}
                style={{
                  background: "linear-gradient(to right, #3b82f6, #9333ea)"
                }}
              >
                {activity.avatar}
              </Avatar>
              <div className={styles.activityInfo}>
                <p className={styles.activityText}>
                  <span className={styles.activityUser}>{activity.user}</span>
                  <span className={styles.activityAction}>
                    {" "}
                    {activity.action}
                  </span>
                </p>
                <p className={styles.activityTime}>{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button type="primary" block className={styles.loadMoreBtn}>
        加载更多活动
      </Button>
    </Card>
  </div>
);

export default HomeActivities;
