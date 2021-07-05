import { navConfigType, routerConfigType } from 'src/constant/types'
import { getSubRoutersBySidebar } from 'utils/router'

/// 侧边栏跳转路由配置
const sidebarConfig:navConfigType = [
  {
    id: '基本使用',
    title: '基本使用',
    children: [
      {
        id: '环境配置',
        title: '环境配置',
        path: '/native/basic/environment-config'
      },
    ]
  },
  {
    id: '样式',
    title: '样式',
    children: [
      {
        id: '基本样式',
        title: '基本样式',
        path: '/native/style/basic-style'
      },
    ]
  },
  {
    id: '内置组件',
    title: '内置组件',
    children: [
      {
        id: '布局组件',
        title: '布局组件',
        path: '/native/component/layout'
      },
      {
        id: '展示组件',
        title: '展示组件',
        path: '/native/component/display'
      },
      {
        id: '交互组件',
        title: '交互组件',
        path: '/native/component/interaction'
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
