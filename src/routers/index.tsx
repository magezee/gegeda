import React from 'react'
import { routerConfigType } from 'src/constant/types'

const routers: routerConfigType = [
  {
    id: 'home',
    exact: true,
    path: '/',
    compoment: React.lazy(() => import('../views/js-page'))
  },
  {
    id: 'js',
    exact: false,
    path: '/js',
    compoment: React.lazy(() => import('../views/js-page'))
  },
  {
    id: 'test',
    exact: false,
    path: '/test/tt',
    compoment: React.lazy(() => import('../views/demo'))
  },

]


export default routers