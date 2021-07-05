import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/native/component--display.md'


const Display:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Display