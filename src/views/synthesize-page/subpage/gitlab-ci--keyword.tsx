import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/synthesize/gitlab-ci--keyword.md'


const Keyword__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Keyword__