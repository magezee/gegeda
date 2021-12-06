import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/html/basic--dom.md'


const HtmlJs__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default HtmlJs__