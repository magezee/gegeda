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
      {
        id: '内置元素',
        title: '内置元素',
        path: '/vue/core-concept/element'
      },
      {
        id: '插件',
        title: '插件',
        path: '/vue/core-concept/plugin'
      },
      {
        id: '数据通信',
        title: '数据通信',
        path: '/vue/core-concept/data-traffic'
      },
      {
        id: '路由',
        title: '路由',
        path: '/vue/core-concept/router'
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
  },
  {
    id: 'Vue3',
    title: 'Vue3',
    children: [
      {
        id: '初始化',
        title: '初始化',
        path: '/vue/vue3/init'
      },
      {
        id: '组合逻辑',
        title: '组合逻辑',
        path: '/vue/vue3/logic'
      },
      {
        id: '视图更新',
        title: '视图更新',
        path: '/vue/vue3/update-view'
      },
      
    ]
  },
  {
    id: 'Ts写法',
    title: 'Ts写法',
    children: [
      {
        id: '类型引入',
        title: '类型引入',
        path: '/vue/ts/type'
      },
      {
        id: '类组件',
        title: '类组件',
        path: '/vue/ts/class-component'
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
