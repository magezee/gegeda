import { navConfigType, routerConfigType } from 'src/constant/types'
import { getSubRoutersBySidebar } from 'utils/router'

/// 侧边栏跳转路由配置
const sidebarConfig:navConfigType = [
  {
    id: '基本概念',
    title: '基本概念',
    children: [
      {
        id: '选择器',
        title: '选择器',
        path: '/css/basic/selector'
      },
      {
        id: '概念性',
        title: '概念性',
        path: '/css/basic/conceptual'
      },
      {
        id: '布局样式',
        title: '布局样式',
        path: '/css/basic/layout'
      },
      {
        id: '盒子样式',
        title: '盒子样式',
        path: '/css/basic/box'
      },
      {
        id: '变形与动画',
        title: '变形与动画',
        path: '/css/basic/animation'
      },
    ]
  },
  {
    id: '高级技巧',
    title: '高级技巧',
    children: [
      {
        id: 'Css',
        title: 'Css',
        path: '/css/advanced-skill/css'
      },
      {
        id: 'Less',
        title: 'Less',
        path: '/css/advanced-skill/less'
      },{
        id: 'Scss',
        title: 'Scss',
        path: '/css/advanced-skill/scss'
      },
    ]
  },
  {
    id: '代码设计',
    title: '代码设计',
    children: [
      {
        id: '选择器',
        title: '选择器',
        path: '/css/code/selector-design'
      },
      {
        id: '布局',
        title: '布局',
        path: '/css/code/layout-design'
      },
      {
        id: '技巧',
        title: '技巧',
        path: '/css/code/technique'
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
