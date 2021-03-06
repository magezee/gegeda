// > 此文件用于配置网站头部导航栏设置,path只负责跳转路由，还需要在 src/config/routers 中再对应配置路由及渲染组件

import { navConfigType } from 'src/constant/types'

const navConfig:navConfigType = [
  {
    id: 'front end',
    title: '前端开发',
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
        path: '/html/basic/element'
      },
      {
        id: 'node',
        title: 'Node',
        path: '/node/protogenesis/concept'
      },
      {
        id: '浏览器',
        title: '浏览器',
        path: '/browser/concept/http'
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
        id: 'synthesize',
        title: '综合技能',
        path: '/synthesize/linux/instructions'
      },
    ]
  },
  {
    id: 'game',
    title: '游戏开发',
    children: [
      {
        id: 'C#',
        title: 'C#',
        path: '/c-sharp/env/compiler'
      },
      {
        id: 'Unity',
        title: 'Unity',
        path: '/unity/script/concept'
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