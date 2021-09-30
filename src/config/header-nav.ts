// > 此文件用于配置网站头部导航栏设置,path只负责跳转路由，还需要在 src/config/routers 中再对应配置路由及渲染组件

import { navConfigType } from 'src/constant/types'

const navConfig:navConfigType = [
  {
    id: 'docs',
    title: '前端资料',
    children: [
      {
        id: 'js',
        title: 'JS',
        path: '/js/execution-context/context'
      },
      {
        id: 'css',
        title: 'CSS',
        path: '/css/basic/selector'
      },
      {
        id: 'html',
        title: 'HTML',
        path: '/html'
      },
      {
        id: 'node',
        title: 'Node',
        path: '/node'
      },
      {
        id: '浏览器',
        title: '浏览器',
        path: '/browser'
      },
      {
        id: 'react',
        title: 'React',
        path: '/react/core-concept/jsx'
      },
      {
        id: 'native',
        title: 'Native',
        path: '/native'
      },
      {
        id: 'vue',
        title: 'Vue',
        path: '/vue/core-concept/vue-app'
      },
      {
        id: 'architecture',
        title: '综合技能',
        path: '/architecture/linux/instructions'
      },
    ]
  },
  {
    id: 'share',
    title: '其他分享',
    children: [
      {
        id: '实用工具',
        title: '实用工具',
        path: '/share/websites/code'
      },
    ]
  }
]


export default navConfig