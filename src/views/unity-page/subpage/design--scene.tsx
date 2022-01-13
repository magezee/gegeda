import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/unity/design--scene.md'

const Scene__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Scene__