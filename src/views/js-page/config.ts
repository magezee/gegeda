import { navConfigType, routerConfigType } from 'src/constant/types'

import { getSubRoutersBySidebar } from 'utils/router'

/// 侧边栏跳转路由配置
const sidebarConfig:navConfigType = [
  {
    id: '执行环境',
    title: '执行环境',
    children: [
      {
        id: '上下文',
        title: '上下文',
        path: '/js/execution-context/context'
      },
      {
        id: '调用栈',
        title: '调用栈',
        path: '/js/execution-context/call-stack'
      },
    ]
  },
  {
    id: '数据类型',
    title: '数据类型',
    children: [
      {
        id: '基本类型',
        title: '基本类型',
        path: '/js/data-type/base-type'
      },
      {
        id: '类型检测',
        title: '类型检测',
        path: '/js/data-type/type-checking'
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



