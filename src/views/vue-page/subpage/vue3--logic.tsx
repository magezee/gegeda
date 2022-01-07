import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/vue/vue3--logic.md'

const Logic__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Logic__