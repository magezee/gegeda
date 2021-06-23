import React from 'react'
import RenderDataPage from 'src/components/render-data-page'
import { sidebarConfig, subRouters } from './config'



const SharePage: React.FC = () => {
  return (
    <RenderDataPage sidebarConfig={sidebarConfig}  subRouters={subRouters} sidebarTitle='实用工具'/>
  )
}

export default SharePage