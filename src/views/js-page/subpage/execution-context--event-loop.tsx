import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/execution-context--event-loop.md'


const EventLoop__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}

export default EventLoop__