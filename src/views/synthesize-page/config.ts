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
        path: '/synthesize/linux/instructions'
      },
    ]
  },
  {
    id: 'Git',
    title: 'Git',
    children: [
      {
        id: '使用',
        title: '使用',
        path: '/synthesize/git/use'
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
        path: '/synthesize/gitlab-ci/basic-use'
      },
      {
        id: 'YAML',
        title: 'YAML',
        path: '/synthesize/gitlab-ci/yaml'
      },
      {
        id: '关键字',
        title: '关键字',
        path: '/synthesize/gitlab-ci/keyword'
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
