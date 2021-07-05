import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/execution-context--context.md'

const Context:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Context