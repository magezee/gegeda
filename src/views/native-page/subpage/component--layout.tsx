import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/native/component--layout.md'


const Layout:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Layout