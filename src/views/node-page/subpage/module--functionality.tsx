import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/node/module--functionality.md'


const Functionality__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Functionality__