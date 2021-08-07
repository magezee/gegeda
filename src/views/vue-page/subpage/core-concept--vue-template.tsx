import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/vue/core-concept--vue-template.md'


const VueTemplate__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default VueTemplate__