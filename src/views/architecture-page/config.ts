import { navConfigType, routerConfigType } from 'src/constant/types'
import { getSubRoutersBySidebar } from 'utils/router'

/// 侧边栏跳转路由配置
const sidebarConfig:navConfigType = [
  {
    id: 'Linux',
    title: 'Linux',
    children: [
      {
        id: '指令',
        title: '指令',
        path: '/architecture/linux/instructions'
      },
    ]
  },
  {
    id: '第三方包',
    title: '第三方包',
    children: [
      {
        id: '通用包',
        title: '通用包',
        path: '/architecture/modules/general'
      },
    ]
  },
  {
    id: 'GitLab CI',
    title: 'GitLab CI',
    children: [
      {
        id: '基本使用',
        title: '基本使用',
        path: '/architecture/gitlab-ci/basic-use'
      },
      {
        id: 'YAML',
        title: 'YAML',
        path: '/architecture/gitlab-ci/yaml'
      },
      {
        id: '关键字',
        title: '关键字',
        path: '/architecture/gitlab-ci/keyword'
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
