import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/vue/vue3--init.md'

const Init__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Init__