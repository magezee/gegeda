import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/node/protogenesis--server.md'


const Server__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Server__