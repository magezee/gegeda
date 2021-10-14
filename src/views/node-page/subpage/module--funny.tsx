import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/node/module--funny.md'


const Funny__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Funny__