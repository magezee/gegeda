import { navConfigType, routerConfigType } from 'src/constant/types'
import { getSubRoutersBySidebar } from 'utils/router'

/// 侧边栏跳转路由配置
const sidebarConfig:navConfigType = [
  {
    id: '基本概念',
    title: '基本概念',
    children: [
      {
        id: '元素标签',
        title: '元素标签',
        path: '/html/basic/element'
      },
      {
        id: '操作DOM',
        title: '操作DOM',
        path: '/html/basic/dom'
      },
      {
        id: '元素事件',
        title: '元素事件',
        path: '/html/basic/event'
      },
      {
        id: '位置范围',
        title: '位置范围',
        path: '/html/basic/location-scope'
      },
    ]
  },
  {
    id: 'Canvas',
    title: 'Canvas',
    children: [
      {
        id: '操作图片',
        title: '操作图片',
        path: '/html/canvas/image'
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
