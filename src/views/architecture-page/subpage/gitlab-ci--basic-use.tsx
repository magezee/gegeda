import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/architecture/gitlab-ci--basic-use.md'


const Introduction__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Introduction__