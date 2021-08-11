import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/vue/api--instruction.md'


const Instruction__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Instruction__