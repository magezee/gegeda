import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navigation from 'src/components/navigation'
import Loading from 'src/components/loading'
import { navConfigType, routerConfigType } from 'src/constant/types'
import './style.scss'

interface renderDataPageProps {
  sidebarConfig: navConfigType
  subRouters: routerConfigType
  sidebarTitle: string
}

/**
 * @description 通用的渲染md资料页面组件
 * @param sidebarConfig 侧边栏配置数据
 * @param subRouters 子路由设置
 */
const RenderDataPage: React.FC<renderDataPageProps> = ({sidebarConfig, subRouters, sidebarTitle}) => {
  return (
    <div className="md-content">
      <div className="sidebar">
        <div className="sidebar-title">{sidebarTitle}</div>
        <Navigation navigationConfig={sidebarConfig}/>
      </div>
      <div className="render-md">
        <React.Suspense fallback={<Loading />}>
          <Switch>
            {subRouters.map((route) => <Route key={route.id} path={route.path} component={route.compoment} exact={route.exact} />)}
          </Switch>
        </React.Suspense>
      </div>
    </div>
  )
}

export default RenderDataPage