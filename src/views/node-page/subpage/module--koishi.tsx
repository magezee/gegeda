import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/node/module--koishi.md'


const Koishi__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Koishi__