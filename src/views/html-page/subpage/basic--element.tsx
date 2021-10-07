import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/html/basic--element.md'


const Element__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Element__