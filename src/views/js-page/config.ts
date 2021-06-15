import { navConfigType, routerConfigType } from 'src/constant/types'

import { getSubRoutersBySidebar } from 'utils/router'

/// 侧边栏跳转路由配置
const sidebarConfig:navConfigType = [
  {
    id: '执行环境',
    title: '执行环境',
    children: [
      {
        id: '执行上下文',
        title: '执行上下文',
        path: '/js/execution-context/context'
      },
      {
        id: '作用域',
        title: '作用域',
        path: '/js/execution-context/scope'
      },
      {
        id: '提升',
        title: '提升',
        path: '/js/execution-context/hoisting'
      },
      {
        id: '事件循环',
        title: '事件循环',
        path: '/js/execution-context/event-loop'
      },
      {
        id: '模块化',
        title: '模块化',
        path: '/js/execution-context/module'
      },
    ]
  },
  {
    id: '数据特性',
    title: '数据特性',
    children: [
      {
        id: '基本类型',
        title: '基本类型',
        path: '/js/data-featurs/base-type'
      },
      {
        id: '原型链',
        title: '原型链',
        path: '/js/data-featurs/prototype-chain'
      },
      {
        id: '构造函数',
        title: '构造函数',
        path: '/js/data-featurs/constructor'
      },
      {
        id: '类',
        title: '类',
        path: '/js/data-featurs/class'
      },
      {
        id: '对象',
        title: '对象',
        path: '/js/data-featurs/object'
      },
      {
        id: '函数',
        title: '函数',
        path: '/js/data-featurs/function'
      },
      {
        id: '数组',
        title: '数组',
        path: '/js/data-featurs/array'
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



