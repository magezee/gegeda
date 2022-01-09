// > 此文件用于配置网站大级路由

import React from 'react'
import { routerConfigType } from 'src/constant/types'

const routers: routerConfigType = [
  {
    id: 'home',
    exact: true,
    path: '/',
    compoment: React.lazy(() => import('../views/js-page'))       // 等待首页设计完毕时更换组件
  },

  // > 前端资料部分路由
  {
    id: 'js',
    exact: false,
    path: '/js',
    compoment: React.lazy(() => import('../views/js-page'))
  },
  {
    id: 'css',
    exact: false,
    path: '/css',
    compoment: React.lazy(() => import('../views/css-page'))
  },
  {
    id: 'html',
    exact: false,
    path: '/html',
    compoment: React.lazy(() => import('../views/html-page'))
  },
  {
    id: 'browser',
    exact: false,
    path: '/browser',
    compoment: React.lazy(() => import('../views/browser-page'))
  },
  {
    id: 'node',
    exact: false,
    path: '/node',
    compoment: React.lazy(() => import('../views/node-page'))
  },
  {
    id: 'react',
    exact: false,
    path: '/react',
    compoment: React.lazy(() => import('../views/react-page'))
  },
  {
    id: 'native',
    exact: false,
    path: '/native',
    compoment: React.lazy(() => import('../views/native-page'))
  },
  {
    id: 'vue',
    exact: false,
    path: '/vue',
    compoment: React.lazy(() => import('../views/vue-page'))
  },
  {
    id: 'synthesize',
    exact: false,
    path: '/synthesize',
    compoment: React.lazy(() => import('../views/synthesize-page'))
  },

  // > 游戏开发相关
  {
    id: 'c-sharp',
    exact: false,
    path: '/c-sharp',
    compoment: React.lazy(() => import('../views/c-sharp-page'))
  },


  // > 其他分享部分路由
  {
    id: 'share',   
    exact: false,
    path: '/share',
    compoment: React.lazy(() => import('../views/share-page'))
  },


  // > 测试组件专用路由
  {
    id: 'test',   
    exact: false,
    path: '/test',
    compoment: React.lazy(() => import('../views/demo'))
  },

]


export default routers