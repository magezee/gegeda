import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/vue/ts--class-component.md'


const VueTypescript__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default VueTypescript__