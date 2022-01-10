import { navConfigType, routerConfigType } from 'src/constant/types'
import { getSubRoutersBySidebar } from 'utils/router'

/// 侧边栏跳转路由配置
const sidebarConfig:navConfigType = [
  {
    id: '执行环境',
    title: '执行环境',
    children: [
      {
        id: '编译器',
        title: '编译器',
        path: '/c-sharp/env/compiler'
      },
      {
        id: '命名空间',
        title: '命名空间',
        path: '/c-sharp/env/namespace'
      },
    ]
  },
  {
    id: '数据特性',
    title: '数据特性',
    children: [
      {
        id: '类型',
        title: '类型',
        path: '/c-sharp/data/type'
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
