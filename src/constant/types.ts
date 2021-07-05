/// 遍历设置路由数据源类型
interface routerItemConfigType  {
  id: string
  exact: boolean
  path: string
  compoment: React.ComponentType<any>
}

type routerConfigType = Array<routerItemConfigType>


/// 遍历导航栏渲染数据源类型
interface navItemConfigType {
  id: string
  title: string
  path?: string
  children?: Array<navChildrenType>
}

interface navChildrenType {
  id: string
  title: string
  path: string
}

type navConfigType = Array<navItemConfigType>







export type {
  routerConfigType,
  navConfigType,
  navChildrenType
}