import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/css/basic--selector.md'

const Basic__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Basic__