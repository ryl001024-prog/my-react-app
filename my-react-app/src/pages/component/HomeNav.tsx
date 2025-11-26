import { memo } from "react";
const HomeNav = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <div className="i-lucide-zap w-5 h-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              TechPortal
            </span>
          </div>

          {/* 桌面导航 */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {["总览", "分析", "项目", "团队", "设置"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* 右侧功能区 */}
          <div className="hidden md:flex items-center space-x-4">
            {/* 搜索框 */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="i-lucide-search w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-64 pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                placeholder="搜索..."
              />
            </div>

            {/* 通知 */}
            <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-100 dark:hover:text-white rounded-lg hover:bg-gray-700 dark:hover: bg-gray-100 transition-colors">
              <div className="i-lucide-bell w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* 用户菜单 */}
            {/*<div className="relative">*/}
            {/*  <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">*/}
            {/*    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">*/}
            {/*      U*/}
            {/*    </div>*/}
            {/*  </button>*/}
            {/*</div>*/}
          </div>

          {/* 移动端菜单按钮 */}
          {/*<div className="md:hidden">*/}
          {/*  <button*/}
          {/*    onClick={() => setIsMenuOpen(!isMenuOpen)}*/}
          {/*    className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"*/}
          {/*  >*/}
          {/*    {isMenuOpen ? (*/}
          {/*      <div className="i-lucide-x w-6 h-6" />*/}
          {/*    ) : (*/}
          {/*      <div className="i-lucide-menu w-6 h-6" />*/}
          {/*    )}*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      </div>

      {/* 移动端菜单 */}
      <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {["总览", "分析", "项目", "团队", "设置"].map((item) => (
            <a
              key={item}
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default memo(HomeNav);
