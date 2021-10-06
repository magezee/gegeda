import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/architecture/gitlab-ci--keyword.md'


const Keyword__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Keyword__