import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/vue/vue3--code-scene.md'


const CodeScene__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default CodeScene__