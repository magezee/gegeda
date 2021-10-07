import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/html/basic--html-js.md'


const HtmlJs__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default HtmlJs__