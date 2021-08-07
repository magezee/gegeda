import React from 'react'
import RenderDataPage from 'src/components/render-data-page'
import { sidebarConfig, subRouters } from './config'



const VuePage: React.FC = () => {
  return (
    <RenderDataPage sidebarConfig={sidebarConfig}  subRouters={subRouters} sidebarTitle='React文档'/>
  )
}

export default VuePage