import { navConfigType, routerConfigType } from 'src/constant/types'
import { getSubRoutersBySidebar } from 'utils/router'

/// 侧边栏跳转路由配置
const sidebarConfig:navConfigType = [
  {
    id: '游戏脚本',
    title: '游戏脚本',
    children: [
      {
        id: '基本概念',
        title: '基本概念',
        path: '/unity/script/concept'
      },
      {
        id: '物体行为',
        title: '物体行为',
        path: '/unity/script/action'
      },
    ]
  },
  {
    id: '游戏设计',
    title: '游戏设计',
    children: [
      {
        id: '场景',
        title: '场景',
        path: '/unity/design/scene'
      },
    ]
  },
]


/// 子路由配置
const subRouters: routerConfigType = getSubRoutersBySidebar(sidebarConfig)

export {
  sidebarConfig,
  subRouters,
}
