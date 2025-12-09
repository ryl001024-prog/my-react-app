import { memo } from "react";
import { Layout, Input, Badge, Menu } from "antd";
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ThemeSwitcher from "@/component/ThemeSwitcher";
import styles from "./HomeNav.module.less";

const { Header } = Layout;

const navItems = [
  { title: "总览", path: "/overview" },
  { title: "分析", path: "#/analyze" },
  { title: "项目", path: "#/project" },
  { title: "团队", path: "#/team" },
  { title: "设置", path: "#/settings" }
];
const HomeNav = () => {
  const menuItems = navItems.map((item) => ({
    key: item.path,
    label: <Link to={item.path}>{item.title}</Link>
  }));

  return (
    <Header className={styles.navHeader}>
      <div className={styles.navContainer}>
        <div className={styles.navContent}>
          {/* Logo */}
          <div className={styles.logoSection}>
            <div className={styles.logoIcon}>
              <div className="i-lucide-zap w-5 h-5 text-white" />
            </div>
            <span className={styles.logoText}>TechPortal</span>
          </div>

          {/* 桌面导航 */}
          <div className={styles.desktopNav}>
            <Menu
              mode="horizontal"
              items={menuItems}
              className={styles.navMenu}
            />
          </div>

          {/* 右侧功能区 */}
          <div className={styles.rightSection}>
            {/* 搜索框 */}
            <Input
              prefix={<SearchOutlined />}
              placeholder="搜索..."
              className={styles.searchInput}
            />

            {/* 通知 */}
            <Badge count={1} size="small">
              <BellOutlined className={styles.notificationIcon} />
            </Badge>

            {/* 主题切换器 */}
            <ThemeSwitcher />

            {/* 用户菜单 */}
            {/* <Avatar className={styles.userAvatar}>U</Avatar> */}
          </div>

          {/* 移动端菜单按钮 */}
          {/* <div className={styles.mobileMenuButton}>
            <Button
              type="text"
              icon={isMenuOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            />
          </div> */}
        </div>
      </div>

      {/* 移动端菜单 */}
      <div className={styles.mobileMenu}>
        <Menu
          mode="vertical"
          items={menuItems}
          className={styles.mobileMenuList}
        />
      </div>
    </Header>
  );
};

export default memo(HomeNav);
