import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/css/basic--animation.md'

const Animation__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Animation__