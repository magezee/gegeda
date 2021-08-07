import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/vue/api--vue-instruction.md'


const VueInstruction__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default VueInstruction__