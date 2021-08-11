import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/vue/core-concept--lifecycle.md'


const Lifecycle__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Lifecycle__