import { Layout } from "antd";
import HomeNav from "@/pages/component/HomeNav.tsx";
import HomeStatistics from "@/pages/component/HomeStatistics.tsx";
import HomeCore from "@/pages/component/HomeCore.tsx";
import HomeActivities from "@/pages/component/HomeActivities.tsx";
import HomeQuickActions from "@/pages/component/HomeQuickActions.tsx";
import styles from "./Home.module.less";

const { Content, Footer } = Layout;

const HomePage = () => {
  return (
    <Layout className={styles.layout}>
      {/* 导航栏 */}
      <HomeNav />

      {/* 主内容区 */}
      <Content className={styles.content}>
        <div className={styles.container}>
          {/* 欢迎区域 */}
          <div className={styles.welcomeSection}>
            <h1 className={styles.welcomeTitle}>欢迎回来！</h1>
            <p className={styles.welcomeDescription}>
              这里是您的控制台总览，查看最新动态和关键指标。
            </p>
          </div>

          {/* 统计卡片网格 */}
          <HomeStatistics />

          {/* 功能区域网格 */}
          <div className={styles.mainGrid}>
            {/* 左侧：功能特性 */}
            <HomeCore />
            {/* 右侧：最近活动 */}
            <HomeActivities />
          </div>

          {/* 快速操作区域 */}
          <HomeQuickActions />
        </div>
      </Content>

      {/* 页脚 */}
      <Footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <div className={styles.footerLogoIcon}>
              <div className="i-lucide-zap w-4 h-4 text-white" />
            </div>
            <span className={styles.footerLogoText}>TechPortal</span>
          </div>
          <div className={styles.footerCopyright}>
            © 2025 Actor-不起眼的小草
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default HomePage;
