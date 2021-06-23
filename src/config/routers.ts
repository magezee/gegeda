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
    id: 'react',
    exact: false,
    path: '/react',
    compoment: React.lazy(() => import('../views/react-page'))
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