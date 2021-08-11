import { navConfigType, routerConfigType } from 'src/constant/types'
import { getSubRoutersBySidebar } from 'utils/router'

/// 侧边栏跳转路由配置
const sidebarConfig:navConfigType = [
  {
    id: '核心概念',
    title: '核心概念',
    children: [
      {
        id: 'vue应用',
        title: 'vue应用',
        path: '/vue/core-concept/vue-app'
      },
      {
        id: '生命周期',
        title: '生命周期',
        path: '/vue/core-concept/lifecycle'
      },
      {
        id: '更新机制',
        title: '更新机制',
        path: '/vue/core-concept/update'
      },
    ]
  },
  {
    id: '内置方法',
    title: '内置方法',
    children: [
      {
        id: '全局方法',
        title: '全局方法',
        path: '/vue/api/global-method'
      },
      {
        id: '实例方法',
        title: '实例方法',
        path: '/vue/api/instance-method'
      },
      {
        id: '指令',
        title: '指令',
        path: '/vue/api/instruction'
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
