import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/html/basic--event.md'


const Event__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Event__