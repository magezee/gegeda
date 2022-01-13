import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/unity/script--action.md'

const Action__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Action__