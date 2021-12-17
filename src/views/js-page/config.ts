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
        id: 'Class',
        title: 'Class',
        path: '/js/data-featurs/class'
      },
      {
        id: 'Object',
        title: 'Object',
        path: '/js/data-featurs/object'
      },
      {
        id: 'Function',
        title: 'Function',
        path: '/js/data-featurs/function'
      },
      {
        id: 'Array',
        title: 'Array',
        path: '/js/data-featurs/array'
      },
      {
        id: 'String',
        title: 'String',
        path: '/js/data-featurs/string'
      },
      {
        id: 'RegExp',
        title: 'RegExp',
        path: '/js/data-featurs/regexp'
      },
      {
        id: 'Number',
        title: 'Number',
        path: '/js/data-featurs/number'
      },
      {
        id: 'Math',
        title: 'Math',
        path: '/js/data-featurs/math'
      },
      {
        id: 'Symbol',
        title: 'Symbol',
        path: '/js/data-featurs/symbol'
      },
      {
        id: 'Map',
        title: 'Map',
        path: '/js/data-featurs/map'
      },
      {
        id: 'Set',
        title: 'Set',
        path: '/js/data-featurs/set'
      },
      {
        id: 'Promise',
        title: 'Promise',
        path: '/js/data-featurs/promise'
      },
    ]
  },
  {
    id: '代码技巧',
    title: '代码技巧',
    children: [
      {
        id: '关键字',
        title: '关键字',
        path: '/js/code-technique/keyword'
      },
      {
        id: '解构',
        title: '解构',
        path: '/js/code-technique/deconstruction'
      },
      {
        id: '闭包',
        title: '闭包',
        path: '/js/code-technique/closure'
      },
    ]
  },
  {
    id: 'Typescript',
    title: 'Typescript',
    children: [
      {
        id: '初始化',
        title: '初始化',
        path: '/js/ts/init'
      },
      {
        id: '声明文件',
        title: '声明文件',
        path: '/js/ts/declare'
      },
      {
        id: '代码结构',
        title: '代码结构',
        path: '/js/ts/code-structure'
      },
      {
        id: '装饰器',
        title: '装饰器',
        path: '/js/ts/decorator'
      },
      {
        id: '类型',
        title: '类型',
        path: '/js/ts/type'
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



