import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/share/websites--resource.md'


const Resource__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Resource__