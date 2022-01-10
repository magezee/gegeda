import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/vue/ts--type.md'


const Type__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Type__