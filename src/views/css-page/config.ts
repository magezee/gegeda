import { navConfigType, routerConfigType } from 'src/constant/types'
import { getSubRoutersBySidebar } from 'utils/router'

/// 侧边栏跳转路由配置
const sidebarConfig:navConfigType = [
  {
    id: '基本概念',
    title: '基本概念',
    children: [
      {
        id: '选择器',
        title: '选择器',
        path: '/css/basic/selector'
      },
      {
        id: '概念性',
        title: '概念性',
        path: '/css/basic/conceptual'
      },
      {
        id: '布局样式',
        title: '布局样式',
        path: '/css/basic/layout'
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
