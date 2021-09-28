import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/execution-context--scope.md'


const Scope__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Scope__