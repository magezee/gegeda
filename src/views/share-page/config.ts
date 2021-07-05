import { navConfigType, routerConfigType } from 'src/constant/types'
import { getSubRoutersBySidebar } from 'utils/router'

/// 侧边栏跳转路由配置
const sidebarConfig:navConfigType = [
  {
    id: '实用网站',
    title: '实用网站',
    children: [
      {
        id: '代码相关',
        title: '代码相关',
        path: '/share/websites/code'
      },
      {
        id: '图形相关',
        title: '图形相关',
        path: '/share/websites/image'
      },
      {
        id: '资源相关',
        title: '资源相关',
        path: '/share/websites/resource'
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
