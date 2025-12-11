import { CustomPluginOption } from "@antv/g6"

export const AfterRenderPlugin = (plugins?: CustomPluginOption[]) => {

    const defaultPlugin: CustomPluginOption[] = [
        {
            type: 'fullscreen',
            key: 'fullscreen-plugin',
            autoFit: true,
            // trigger: {
            //     request: 'F', // 使用快捷键 F 进入全屏
            //     exit: 'Esc', // 使用快捷键 Esc 退出全屏
            // },

        }]

    return [...plugins || [], ...defaultPlugin] as CustomPluginOption[]
}

// 鱼眼放大镜默认配置
export const fishEyes = {
    type: 'fisheye',
    key: 'fisheye-plugin',
    // 通过滚轮调整半径
    scaleRBy: 'wheel',
    // 通过拖拽调整畸变因子
    scaleDBy: 'drag',
    // 设置半径和畸变因子的范围
    r: 40,
    minR: 10,
    maxR: 100,
    minD: 1,
    maxD: 3,
}