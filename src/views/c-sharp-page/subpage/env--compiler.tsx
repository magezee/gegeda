import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/c-sharp/env--compiler.md'


const Compiler__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Compiler__