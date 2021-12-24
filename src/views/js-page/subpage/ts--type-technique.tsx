import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/ts--type-technique.md'


const Technique__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Technique__