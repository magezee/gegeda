import React from 'react'
import RenderDataPage from 'src/components/render-data-page'
import { sidebarConfig, subRouters } from './config'



const SharePage: React.FC = () => {
  return (
    <RenderDataPage sidebarConfig={sidebarConfig}  subRouters={subRouters} sidebarTitle='C#资料'/>
  )
}

export default SharePage