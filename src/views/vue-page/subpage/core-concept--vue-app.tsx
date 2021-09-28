import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/vue/core-concept--vue-app.md'


const VueApp__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default VueApp__