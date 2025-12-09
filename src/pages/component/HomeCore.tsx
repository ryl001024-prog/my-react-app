import React from "react";
import { Button, Card } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./HomeCore.module.less";

const features = [
  {
    icon: "i-lucide-globe",
    title: "全球覆盖",
    description: "服务覆盖全球200+国家和地区",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: "i-lucide-shield",
    title: "安全可靠",
    description: "企业级安全防护，数据加密传输",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: "i-lucide-zap",
    title: "极速体验",
    description: "毫秒级响应，优化用户体验",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: "i-lucide-bar-chart-3",
    title: "智能分析",
    description: "深度数据分析，助力业务决策",
    color: "from-orange-500 to-red-500"
  }
];

const HomeCore: React.FC = () => (
  <div className={styles.container}>
    <Card className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>核心功能</h2>
        <Button
          type="link"
          icon={<ArrowRightOutlined />}
          iconPlacement="end"
          className={styles.viewAllBtn}
        >
          查看全部
        </Button>
      </div>

      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <Card key={index} className={styles.featureCard} hoverable>
            <div
              className={`${styles.featureIcon} bg-gradient-to-r ${feature.color}`}
            >
              <div className={`${feature.icon} w-6 h-6 text-white`} />
            </div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </Card>
        ))}
      </div>
    </Card>
  </div>
);

export default HomeCore;
