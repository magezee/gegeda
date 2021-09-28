import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/execution-context--module.md'


const Module__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}

export default Module__