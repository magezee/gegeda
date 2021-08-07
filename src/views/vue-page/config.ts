import { navConfigType, routerConfigType } from 'src/constant/types'
import { getSubRoutersBySidebar } from 'utils/router'

/// 侧边栏跳转路由配置
const sidebarConfig:navConfigType = [
  {
    id: '核心概念',
    title: '核心概念',
    children: [
      {
        id: 'vue模板',
        title: 'vue模板',
        path: '/vue/core-concept/vue-template'
      },
    ]
  },
  {
    id: '内置方法',
    title: '内置方法',
    children: [
      {
        id: 'vue指令',
        title: 'vue指令',
        path: '/vue/api/vue-instruction'
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
