import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/architecture/linux--instructions.md'


const Instructions__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Instructions__