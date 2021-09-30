import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/css/basic--conceptual.md'

const Conceptual__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Conceptual__