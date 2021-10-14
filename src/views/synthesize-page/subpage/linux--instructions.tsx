import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/synthesize/linux--instructions.md'


const Instructions__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Instructions__