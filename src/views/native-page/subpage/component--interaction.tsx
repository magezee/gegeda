import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/native/component--interaction.md'


const Interaction__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Interaction__