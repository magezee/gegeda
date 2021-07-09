import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/native/component--layout.md'


const Layout__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Layout__