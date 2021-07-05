
import React from 'react'
import { navConfigType, navChildrenType } from 'src/constant/types'

/// 通过侧边栏配置生成子路由配置
/// 规定命名方式：渲染对应md组件存放在 views/${type}-page目录下，md存放在markdown/${type}目录下，组件文件名字和md名字要求相同
const transformPath = (path: string, type: string) => {
  const result =  path.replace(/^\/.*?\//, `${type}-page/subpage/`)
  const symbolNum = result.length - result.lastIndexOf('/')
  // eslint-disable-next-line
  const reg = new RegExp(`\/(?=.{${symbolNum-1}}$)`)
  return result.replace(reg, '--')
}

const getSubRoutersBySidebar = (sidebarConfig: navConfigType): any => {
  const subRouters = []
  for(let i=0; i<sidebarConfig.length; i++) {
    const childrenArr = sidebarConfig[i].children as navChildrenType[]
    for(let j=0; j<childrenArr.length; j++) {
      const type =  childrenArr[j].path.split('/')[1]
      subRouters.push({
        id: childrenArr[j].id,
        exact: true,
        path: childrenArr[j].path,
        compoment: React.lazy(() => import(`src/views/${transformPath(childrenArr[j].path, type)}`)) 
      })
    }
  }
  return subRouters
}

export {
  getSubRoutersBySidebar
}