import { navConfigType, routerConfigType } from 'src/constant/types'
import { getSubRoutersBySidebar } from 'utils/router'

/// 侧边栏跳转路由配置
const sidebarConfig:navConfigType = [
  {
    id: '基本概念',
    title: '基本概念',
    children: [
      {
        id: '元素',
        title: '元素',
        path: '/html/basic/element'
      },
      {
        id: '操作元素',
        title: '操作元素',
        path: '/html/basic/html-js'
      },
    ]
  }
]


/// 子路由配置
const subRouters: routerConfigType = getSubRoutersBySidebar(sidebarConfig)

export {
  sidebarConfig,
  subRouters,
}
