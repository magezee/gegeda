import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/unity/script--concept.md'

const Concept__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Concept__