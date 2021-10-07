import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/css/basic--box.md'

const Box__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Box__