import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/synthesize/gitlab-ci--yaml.md'


const YAML__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default YAML__