import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/node/module--socket-io.md'


const Socket__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Socket__