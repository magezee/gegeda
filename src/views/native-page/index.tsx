import React from 'react'
import RenderDataPage from 'src/components/render-data-page'
import { sidebarConfig, subRouters } from './config'



const ReactPage: React.FC = () => {
  return (
    <RenderDataPage sidebarConfig={sidebarConfig}  subRouters={subRouters} sidebarTitle='Native文档'/>
  )
}

export default ReactPage