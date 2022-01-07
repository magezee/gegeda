import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/vue/vue3--update-view.md'

const UpdateView__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default UpdateView__