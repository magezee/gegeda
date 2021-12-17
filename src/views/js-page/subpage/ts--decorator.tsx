import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/ts--decorator.md'


const Decorator__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}




export default Decorator__