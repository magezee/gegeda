import { navConfigType, routerConfigType } from 'src/constant/types'
import { getSubRoutersBySidebar } from 'utils/router'

/// 侧边栏跳转路由配置
const sidebarConfig:navConfigType = [
  {
    id: '原生',
    title: '原生',
    children: [
      {
        id: '概念',
        title: '概念',
        path: '/node/protogenesis/concept'
      },
      {
        id: 'Path',
        title: 'Path',
        path: '/node/protogenesis/path'
      },
      {
        id: 'Fs',
        title: 'Fs',
        path: '/node/protogenesis/fs'
      },
      {
        id: 'Http',
        title: 'Http',
        path: '/node/protogenesis/http'
      },
    ]
  },
  {
    id: 'Webpack',
    title: 'Webpack',
    children: [
      {
        id: '概念',
        title: '概念',
        path: '/node/webpack/concept'
      },
      {
        id: '配置参考',
        title: '配置参考',
        path: '/node/webpack/demo'
      },
    ]
  },
  {
    id: 'Express',
    title: 'Express',
    children: [
      {
        id: '服务器',
        title: '服务器',
        path: '/node/express/server'
      },
    ]
  },
  {
    id: 'Koa',
    title: 'Koa',
    children: [
      {
        id: '服务器',
        title: '服务器',
        path: '/node/koa/server'
      },
    ]
  },
  {
    id: '模块包',
    title: '模块包',
    children: [
      {
        id: 'socket.io',
        title: 'socket.io',
        path: '/node/module/socket-io'
      },
      {
        id: 'koishi',
        title: 'koishi',
        path: '/node/module/koishi'
      },
      {
        id: 'puppeteer',
        title: 'puppeteer',
        path: '/node/module/puppeteer'
      },
      {
        id: 'webpack相关',
        title: 'webpack相关',
        path: '/node/module/webpack'
      },
      {
        id: '功能性',
        title: '功能性',
        path: '/node/module/functionality'
      },
      {
        id: '好玩的',
        title: '好玩的',
        path: '/node/module/funny'
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
