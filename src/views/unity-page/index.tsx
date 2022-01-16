import React from 'react'
import RenderDataPage from 'src/components/render-data-page'
import { sidebarConfig, subRouters } from './config'



const UnityPage: React.FC = () => {
  return (
    <RenderDataPage sidebarConfig={sidebarConfig}  subRouters={subRouters} sidebarTitle='Untiy文档'/>
  )
}

export default UnityPage