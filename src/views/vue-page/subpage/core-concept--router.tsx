import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/vue/core-concept--router.md'


const Router__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Router__