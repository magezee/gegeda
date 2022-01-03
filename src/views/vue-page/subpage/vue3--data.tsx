import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/vue/vue3--data.md'

const Data__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Data__